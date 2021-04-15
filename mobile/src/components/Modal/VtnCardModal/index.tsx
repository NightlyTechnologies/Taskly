import React, { useState, useCallback, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Modal as ReactModal,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCity } from '../../../hooks/city';

import { Vtn as VtnData } from '../../../pages/Cities/CityDetails';

import {
  Container,
  Title,
  YearContainer,
  Year,
  Section,
  Key,
  InputContainer,
  Input,
  Currency,
  Divider,
  ModalContainer,
  Background,
  Buttons,
  Cancel,
  Submit,
} from './styles';

type Years = '2015' | '2016' | '2017' | '2018' | '2019';

type Vtn = Omit<VtnData, 'year'>;

interface VtnCardModalProps {
  data: VtnData;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<VtnCardModalProps> = ({
  data,
  isOpen,
  setModalIsOpen,
}) => {
  const { updateCity } = useCity();

  const [editData, setEditData] = useState<Vtn>({} as Vtn);

  const clearInputs = useCallback(() => {
    setEditData({} as Vtn);
  }, []);

  const handleCancelModalEdit = useCallback(() => {
    setModalIsOpen(false);
    clearInputs();
  }, [setModalIsOpen, clearInputs]);

  const handleSubmitModalEdit = useCallback(() => {
    updateCity({ data: editData, type: String(data.year) as Years });

    setModalIsOpen(false);
    clearInputs();
  }, [setModalIsOpen, updateCity, editData, data.year, clearInputs]);

  useEffect(() => {
    clearInputs();
  }, [clearInputs]);

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
            <Title>Valores de Terra Nua (VTN)</Title>
            <YearContainer>
              <Year>{data.year}</Year>
            </YearContainer>
            <Section>
              <Key>Lavoura de{'\n'}Aptidão Boa</Key>
              <InputContainer>
                <Currency>R$</Currency>
                <Input
                  type="money"
                  options={{
                    unit: '',
                  }}
                  keyboardType="numeric"
                  value={editData.good || data.good}
                  maxLength={13}
                  includeRawValueInChangeText
                  onChangeText={(value, good) => {
                    good && setEditData({ ...editData, good });
                  }}
                />
              </InputContainer>
            </Section>
            <Divider />
            <Section>
              <Key>Lavoura de{'\n'}Aptidão Regular</Key>
              <InputContainer>
                <Currency>R$</Currency>
                <Input
                  type="money"
                  options={{
                    unit: '',
                  }}
                  keyboardType="numeric"
                  value={editData.regular || data.regular}
                  maxLength={13}
                  includeRawValueInChangeText
                  onChangeText={(value, regular) => {
                    regular && setEditData({ ...editData, regular });
                  }}
                />
              </InputContainer>
            </Section>
            <Divider />
            <Section>
              <Key>Lavoura de{'\n'}Aptidão Restrita</Key>
              <InputContainer>
                <Currency>R$</Currency>
                <Input
                  type="money"
                  options={{
                    unit: '',
                  }}
                  keyboardType="numeric"
                  value={editData.restricted || data.restricted}
                  maxLength={13}
                  includeRawValueInChangeText
                  onChangeText={(value, restricted) => {
                    restricted && setEditData({ ...editData, restricted });
                  }}
                />
              </InputContainer>
            </Section>
            <Divider />
            <Section>
              <Key>Pastagem{'\n'}Plantada</Key>
              <InputContainer>
                <Currency>R$</Currency>
                <Input
                  type="money"
                  options={{
                    unit: '',
                  }}
                  keyboardType="numeric"
                  value={editData.planted || data.planted}
                  maxLength={13}
                  includeRawValueInChangeText
                  onChangeText={(value, planted) => {
                    planted && setEditData({ ...editData, planted });
                  }}
                />
              </InputContainer>
            </Section>
            <Divider />
            <Section>
              <Key>Silvicultura ou{'\n'}Pastagem Natural</Key>
              <InputContainer>
                <Currency>R$</Currency>
                <Input
                  type="money"
                  options={{
                    unit: '',
                  }}
                  keyboardType="numeric"
                  value={editData.natural || data.natural}
                  maxLength={13}
                  includeRawValueInChangeText
                  onChangeText={(value, natural) => {
                    natural && setEditData({ ...editData, natural });
                  }}
                />
              </InputContainer>
            </Section>
            <Divider />
            <Section>
              <Key>Preservação da{'\n'}Fauna ou Flora</Key>
              <InputContainer>
                <Currency>R$</Currency>
                <Input
                  type="money"
                  options={{
                    unit: '',
                  }}
                  keyboardType="numeric"
                  value={editData.preservation || data.preservation}
                  maxLength={13}
                  includeRawValueInChangeText
                  onChangeText={(value, preservation) => {
                    preservation && setEditData({ ...editData, preservation });
                  }}
                />
              </InputContainer>
            </Section>
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

const VtnCardModal: React.FC<VtnCardModalProps> = ({
  data,
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
        <Modal data={data} isOpen={isOpen} setModalIsOpen={setModalIsOpen} />
      )}
    </ReactModal>
    {Platform.OS === 'android' && (
      <Modal data={data} isOpen={isOpen} setModalIsOpen={setModalIsOpen} />
    )}
  </>
);

export default VtnCardModal;
