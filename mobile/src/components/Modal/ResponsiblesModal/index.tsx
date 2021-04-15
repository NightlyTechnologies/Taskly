import React, { useState, useCallback, useEffect } from 'react';
import {
  Platform,
  Modal as ReactModal,
  KeyboardAvoidingView,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { addDays, formatISO } from 'date-fns';
import DatePicker from '@react-native-community/datetimepicker';
import { useCity } from '../../../hooks/city';

import { Responsible } from '../../../pages/Cities/CityDetails';
import { ResponsiblesType } from '../../Responsibles';

import formatDate from '../../../utils/formatDate';

import {
  Container,
  Header,
  Linear,
  Title,
  InputContainer,
  Input,
  MaskedInput,
  Section,
  Keys,
  Info,
  TypeSection,
  Key,
  Types,
  Type,
  TypeText,
  Picker,
  Value,
  DatePickerContainer,
  ModalContainer,
  Background,
  Buttons,
  Cancel,
  Submit,
} from './styles';

type UpdateType = 'mayor' | 'tax_responsible' | 'supervisor1' | 'supervisor2';

interface EditData {
  name: string;
  email: string;
  role: string;
  phone: string;
  qualification: string;
  birth: string;
  reelected: boolean;
}

interface ResponsiblesModalProps {
  responsible: Responsible;
  type: ResponsiblesType;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ResponsiblesModalProps> = ({
  responsible,
  type,
  isOpen,
  setModalIsOpen,
}) => {
  const { updateCity } = useCity();

  const [editData, setEditData] = useState<EditData>({} as EditData);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reelectedWasModify, setReelectedWasModify] = useState(false);

  const formatInfo = useCallback(() => {
    if (type === 'Fiscal 1' || type === 'Fiscal 2') {
      return true;
    }
    return false;
  }, [type]);

  const formatUpdateType = useCallback((): UpdateType => {
    switch (type) {
      case 'Prefeito':
        return 'mayor';

      case 'Responsável Tributário':
        return 'tax_responsible';

      case 'Fiscal 1':
        return 'supervisor1';

      default:
        return 'supervisor2';
    }
  }, [type]);

  const handleDateChange = useCallback(
    (event, dateChanged: Date | undefined) => {
      setShowDatePicker(false);

      if (dateChanged) {
        setEditData(
          formatInfo()
            ? {
              ...editData,
              qualification: formatISO(dateChanged, {
                representation: 'date',
              }),
            }
            : {
              ...editData,
              birth: formatISO(dateChanged, { representation: 'date' }),
            },
        );
      }
    },
    [editData, formatInfo],
  );

  const handleCancelModalEdit = useCallback(() => {
    setModalIsOpen(false);
    setEditData({} as EditData);
  }, [setModalIsOpen]);

  const handleSubmitModalEdit = useCallback(() => {
    updateCity({ data: editData, type: formatUpdateType() });

    setEditData({} as EditData);
    setModalIsOpen(false);
  }, [setModalIsOpen, editData, updateCity, formatUpdateType]);

  useEffect(() => {
    setEditData({} as EditData);
  }, []);

  return (
    <ReactModal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={() => setModalIsOpen(false)}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ModalContainer>
          <Container>
            <Header>
              <Linear
                colors={['#EB3349', '#F45C43']}
                start={[0, 0.5]}
                end={[1, 0.5]}
              >
                <Title>{type}</Title>
              </Linear>
            </Header>
            <InputContainer>
              <AntDesign name="user" color="#EB3349" size={20} />
              <Input
                autoCapitalize="words"
                value={editData.name || responsible.name}
                onChangeText={name => setEditData({ ...editData, name })}
              />
            </InputContainer>
            {formatInfo() ? (
              <>
                <Section>
                  <Keys>
                    <MaterialCommunityIcons
                      name="calendar-range-outline"
                      color="#EB3349"
                      size={25}
                    />
                    <Info>Data de qualificação:</Info>
                  </Keys>
                  <Picker onPress={() => setShowDatePicker(true)}>
                    <Value>
                      {editData.qualification
                        ? formatDate(editData.qualification, false)
                        : formatDate(responsible.qualification, true)}
                    </Value>
                  </Picker>
                </Section>
                {showDatePicker && (
                  <DatePickerContainer>
                    <DatePicker
                      onChange={handleDateChange}
                      value={addDays(
                        new Date(
                          editData.qualification
                            ? editData.qualification
                            : responsible.qualification,
                        ),
                        1,
                      )}
                      style={{ width: '100%', height: 50 }}
                      display="spinner"
                      mode="date"
                    />
                  </DatePickerContainer>
                )}
              </>
            ) : (
              <>
                <Section>
                  <Keys>
                    <MaterialCommunityIcons
                      name="calendar-range-outline"
                      color="#EB3349"
                      size={25}
                    />
                    <Info>Data de nascimento:</Info>
                  </Keys>
                  <Picker onPress={() => setShowDatePicker(true)}>
                    <Value>
                      {editData.birth
                        ? formatDate(editData.birth, false)
                        : formatDate(responsible.birth, true)}
                    </Value>
                  </Picker>
                </Section>
                {showDatePicker && (
                  <DatePickerContainer>
                    <DatePicker
                      onChange={handleDateChange}
                      value={addDays(
                        new Date(
                          editData.birth ? editData.birth : responsible.birth,
                        ),
                        1,
                      )}
                      style={{ width: '100%', height: 50 }}
                      display="spinner"
                      mode="date"
                    />
                  </DatePickerContainer>
                )}
              </>
            )}
            <InputContainer>
              <Feather name="mail" color="#EB3349" size={20} />
              <Input
                keyboardType="email-address"
                value={editData.email || responsible.email}
                onChangeText={email => setEditData({ ...editData, email })}
              />
            </InputContainer>
            <InputContainer>
              <Feather name="phone" color="#EB3349" size={19} />
              <MaskedInput
                type="cel-phone"
                keyboardType="numeric"
                value={editData.phone || responsible.phone}
                includeRawValueInChangeText
                onChangeText={(value, phone) => {
                  phone && setEditData({ ...editData, phone });
                }}
              />
            </InputContainer>
            {type === 'Prefeito' ? (
              <TypeSection>
                <Key>Reeleito:</Key>
                <Types>
                  <Type
                    onPress={() => {
                      setEditData({ ...editData, reelected: false });
                      setReelectedWasModify(true);
                    }}
                    red
                    selected={
                      reelectedWasModify
                        ? editData.reelected
                        : responsible.reelected
                    }
                  >
                    <TypeText
                      red
                      selected={
                        reelectedWasModify
                          ? editData.reelected
                          : responsible.reelected
                      }
                    >
                      Não
                    </TypeText>
                  </Type>
                  <Type
                    onPress={() => {
                      setEditData({ ...editData, reelected: true });
                      setReelectedWasModify(true);
                    }}
                    green
                    selected={
                      reelectedWasModify
                        ? editData.reelected
                        : responsible.reelected
                    }
                  >
                    <TypeText
                      green
                      selected={
                        reelectedWasModify
                          ? editData.reelected
                          : responsible.reelected
                      }
                    >
                      Sim
                    </TypeText>
                  </Type>
                </Types>
              </TypeSection>
            ) : (
              <InputContainer>
                <MaterialCommunityIcons
                  name="briefcase-outline"
                  color="#EB3349"
                  size={21}
                />
                <Input
                  autoCapitalize="words"
                  value={editData.role || responsible.role}
                  onChangeText={role => setEditData({ ...editData, role })}
                />
              </InputContainer>
            )}
          </Container>
          <Buttons>
            <Cancel onPress={handleCancelModalEdit}>
              <Feather name="x" size={50} color="#EB3349" />
            </Cancel>
            <Submit onPress={handleSubmitModalEdit}>
              <Feather name="check" size={45} color="#fff" />
            </Submit>
          </Buttons>
        </ModalContainer>
      </KeyboardAvoidingView>
    </ReactModal>
  );
};

const ResponsiblesModal: React.FC<ResponsiblesModalProps> = ({
  responsible,
  type,
  isOpen,
  setModalIsOpen,
}) => (
  <>
    <ReactModal
      statusBarTranslucent
      animationType="fade"
      transparent
      visible={isOpen}
    >
      <Background />
      {Platform.OS === 'ios' && (
        <Modal
          responsible={responsible}
          type={type}
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </ReactModal>
    {Platform.OS === 'android' && (
      <Modal
        responsible={responsible}
        type={type}
        isOpen={isOpen}
        setModalIsOpen={setModalIsOpen}
      />
    )}
  </>
);

export default ResponsiblesModal;
