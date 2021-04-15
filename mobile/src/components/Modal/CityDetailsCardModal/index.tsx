import React, { useState, useCallback } from 'react';
import {
  Platform,
  Modal as ReactModal,
  KeyboardAvoidingView,
} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import { addDays, formatISO } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import { useCity, CityDetailsCard } from '../../../hooks/city';

import formatDate from '../../../utils/formatDate';

import { City } from '../../../pages/Cities/CityList';

import {
  Container,
  Title,
  Section,
  Key,
  Picker,
  Value,
  DatePickerContainer,
  Input,
  TypeSection,
  Types,
  Type,
  TypeText,
  ModalContainer,
  Background,
  Buttons,
  Cancel,
  Submit,
} from './styles';

interface CityDetailsCardModalProps {
  city: City;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<CityDetailsCardModalProps> = ({
  city,
  isOpen,
  setModalIsOpen,
}) => {
  const { updateCity } = useCity();

  const [editData, setEditData] = useState<CityDetailsCard>(
    {} as CityDetailsCard,
  );

  const [showBeginDatePicker, setShowBeginDatePicker] = useState(false);
  const [showFinalDatePicker, setShowFinalDatePicker] = useState(false);
  const [beginValidityWasModify, setBeginValidityWasModify] = useState(false);
  const [finalValidityWasModify, setFinalValidityWasModify] = useState(false);

  const handleBeginValidityChange = useCallback(
    (event, date: Date | undefined) => {
      setShowBeginDatePicker(false);

      if (date) {
        setEditData({
          ...editData,
          begin_validity: formatISO(date, { representation: 'date' }),
        });
        setBeginValidityWasModify(true);
      }
    },
    [editData],
  );

  const handleFinalValidityChange = useCallback(
    (event, date: Date | undefined) => {
      setShowFinalDatePicker(false);

      if (date) {
        setEditData({
          ...editData,
          final_validity: formatISO(date, { representation: 'date' }),
        });
        setFinalValidityWasModify(true);
      }
    },
    [editData],
  );

  const handleSubmitModalEdit = useCallback(() => {
    updateCity({ data: editData, type: 'details' });

    setModalIsOpen(false);
  }, [updateCity, editData, setModalIsOpen]);

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
            <Title>Detalhes do Município</Title>
            <Section>
              <Key>Início da vigência:</Key>
              <Picker onPress={() => setShowBeginDatePicker(true)}>
                <Value>
                  {formatDate(
                    editData.begin_validity || city.begin_validity,
                    !beginValidityWasModify,
                  )}
                </Value>
              </Picker>
            </Section>
            {showBeginDatePicker && (
              <DatePickerContainer>
                <DatePicker
                  onChange={handleBeginValidityChange}
                  value={addDays(
                    new Date(editData.begin_validity || city.begin_validity),
                    1,
                  )}
                  style={{ width: '100%', height: 50 }}
                  display="spinner"
                  mode="date"
                />
              </DatePickerContainer>
            )}
            <Section>
              <Key>Fim da vigência:</Key>
              <Picker onPress={() => setShowFinalDatePicker(true)}>
                <Value>
                  {formatDate(
                    editData.final_validity || city.final_validity,
                    !finalValidityWasModify,
                  )}
                </Value>
              </Picker>
            </Section>
            {showFinalDatePicker && (
              <DatePickerContainer>
                <DatePicker
                  onChange={handleFinalValidityChange}
                  value={addDays(
                    new Date(editData.final_validity || city.final_validity),
                    1,
                  )}
                  style={{ width: '100%', height: 50 }}
                  display="spinner"
                  mode="date"
                />
              </DatePickerContainer>
            )}
            <Section>
              <Key>Valor de contrato:</Key>
              <Input
                type="money"
                keyboardType="numeric"
                value={
                  editData.contract_value
                    ? editData.contract_value
                    : city.contract_value
                }
                maxLength={15}
                includeRawValueInChangeText
                onChangeText={(value, contract_value) => {
                  contract_value &&
                    setEditData({ ...editData, contract_value });
                }}
              />
            </Section>
            <TypeSection>
              <Key>Tipo de contrato:</Key>
              <Types type="double">
                <Type
                  onPress={() => {
                    setEditData({ ...editData, contract_type: 'online' });
                  }}
                  color="black"
                  selected={
                    editData.contract_type
                      ? editData.contract_type === 'online'
                      : city.contract_type === 'online'
                  }
                >
                  <TypeText
                    selected={
                      editData.contract_type
                        ? editData.contract_type === 'online'
                        : city.contract_type === 'online'
                    }
                  >
                    Online
                  </TypeText>
                </Type>
                <Type
                  onPress={() => {
                    setEditData({
                      ...editData,
                      contract_type: 'presential',
                    });
                  }}
                  selected={
                    editData.contract_type
                      ? editData.contract_type === 'presential'
                      : city.contract_type === 'presential'
                  }
                >
                  <TypeText
                    selected={
                      editData.contract_type
                        ? editData.contract_type === 'presential'
                        : city.contract_type === 'presential'
                    }
                  >
                    Presencial
                  </TypeText>
                </Type>
              </Types>
            </TypeSection>
            <TypeSection>
              <Key>Situação do convênio:</Key>
              <Types>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, agreement: 'denounced' });
                  }}
                  color="red"
                  selected={
                    editData.agreement
                      ? editData.agreement === 'denounced'
                      : city.agreement === 'denounced'
                  }
                >
                  <TypeText
                    selected={
                      editData.agreement
                        ? editData.agreement === 'denounced'
                        : city.agreement === 'denounced'
                    }
                  >
                    Denunciado
                  </TypeText>
                </Type>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, agreement: 'nonexistent' });
                  }}
                  color="black"
                  selected={
                    editData.agreement
                      ? editData.agreement === 'nonexistent'
                      : city.agreement === 'nonexistent'
                  }
                >
                  <TypeText
                    selected={
                      editData.agreement
                        ? editData.agreement === 'nonexistent'
                        : city.agreement === 'nonexistent'
                    }
                  >
                    Inexistente
                  </TypeText>
                </Type>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, agreement: 'ok' });
                  }}
                  selected={
                    editData.agreement
                      ? editData.agreement === 'ok'
                      : city.agreement === 'ok'
                  }
                >
                  <TypeText
                    selected={
                      editData.agreement
                        ? editData.agreement === 'ok'
                        : city.agreement === 'ok'
                    }
                  >
                    Ok
                  </TypeText>
                </Type>
              </Types>
              <Types type="extended">
                <Type
                  onPress={() => {
                    setEditData({
                      ...editData,
                      agreement: 'unable_worker',
                    });
                  }}
                  color="red"
                  extended
                  selected={
                    editData.agreement
                      ? editData.agreement === 'unable_worker'
                      : city.agreement === 'unable_worker'
                  }
                >
                  <TypeText
                    selected={
                      editData.agreement
                        ? editData.agreement === 'unable_worker'
                        : city.agreement === 'unable_worker'
                    }
                  >
                    Servidor não habilitado
                  </TypeText>
                </Type>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, agreement: 'unpublished' });
                  }}
                  color="red"
                  extended
                  selected={
                    editData.agreement
                      ? editData.agreement === 'unpublished'
                      : city.agreement === 'unpublished'
                  }
                >
                  <TypeText
                    selected={
                      editData.agreement
                        ? editData.agreement === 'unpublished'
                        : city.agreement === 'unpublished'
                    }
                  >
                    Assinado não publicado
                  </TypeText>
                </Type>
              </Types>
            </TypeSection>
          </Container>
          <Buttons>
            <Cancel onPress={() => setModalIsOpen(false)}>
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

const CityDetailsCardModal: React.FC<CityDetailsCardModalProps> = ({
  city,
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
        <Modal city={city} isOpen={isOpen} setModalIsOpen={setModalIsOpen} />
      )}
    </ReactModal>
    {Platform.OS === 'android' && (
      <Modal city={city} isOpen={isOpen} setModalIsOpen={setModalIsOpen} />
    )}
  </>
);

export default CityDetailsCardModal;
