import React, { useCallback } from 'react';
import {
  Platform,
  Modal as ReactModal,
  KeyboardAvoidingView,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { useActivity } from '../../../hooks/activity';

import {
  Container,
  Info,
  ModalContainer,
  Background,
  Buttons,
  Cancel,
  Submit,
} from './styles';

interface ConfirmUpdateModalProps {
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activity_id: string;
  status: 'pending' | 'finished';
}

const Modal: React.FC<ConfirmUpdateModalProps> = ({
  isOpen,
  setModalIsOpen,
  activity_id,
  status,
}) => {
  const { updateActivityStatus } = useActivity();

  const handleUpdateStatus = useCallback(() => {
    updateActivityStatus(activity_id, status);
    setModalIsOpen(false);
  }, [activity_id, status, updateActivityStatus, setModalIsOpen]);

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
            <MaterialIcons
              name={
                status === 'pending' ? 'playlist-add' : 'playlist-add-check'
              }
              size={85}
              color="#EB3349"
            />
            <Info>
              {status === 'pending'
                ? 'Deseja iniciar a atividade?'
                : 'Deseja concluir a atividade?'}
            </Info>
          </Container>
          <Buttons>
            <Cancel onPress={() => setModalIsOpen(false)}>
              <Feather name="x" size={50} color="#EB3349" />
            </Cancel>
            <Submit onPress={handleUpdateStatus}>
              <Feather name="check" size={45} color="#fff" />
            </Submit>
          </Buttons>
        </ModalContainer>
      </KeyboardAvoidingView>
    </ReactModal>
  );
};

const ConfirmUpdateModal: React.FC<ConfirmUpdateModalProps> = ({
  isOpen,
  setModalIsOpen,
  activity_id,
  status,
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
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          activity_id={activity_id}
          status={status}
        />
      )}
    </ReactModal>
    {Platform.OS === 'android' && (
      <Modal
        isOpen={isOpen}
        setModalIsOpen={setModalIsOpen}
        activity_id={activity_id}
        status={status}
      />
    )}
  </>
);

export default ConfirmUpdateModal;
