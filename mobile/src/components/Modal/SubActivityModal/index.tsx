import React, { useState, useCallback } from 'react';
import { Platform, Modal as ReactModal } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { formatISO, parseISO, addDays } from 'date-fns';

import CompleteButton from '../../Button';
import ActivityEdit from '../../ActivityEdit';

import { useAuth } from '../../../hooks/auth';
import { User, useTeam } from '../../../hooks/team';
import {
  UpdateData,
  UpdateSubData,
  useActivity,
} from '../../../hooks/activity';

import formatDate from '../../../utils/formatDate';

import { SubActivity } from '../../../pages/Activities/MyActivities';

import {
  Container,
  Title,
  SubResponsible,
  SubAvatar,
  SubDeadline,
  SubDeadlineText,
  SubDeadlineDate,
  Description,
  Status,
  StatusName,
  StatusBar,
  StatusBarProgress,
  ModalContainer,
  Background,
  Buttons,
  Button,
  DeleteQuestion,
  SubName,
  Info,
} from './styles';

interface ActivityUsers {
  user: User;
  isSelected: boolean;
}

interface EditSubActivityModalProps {
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDefaultIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSubActivityModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: UpdateSubData;
  setUpdateData: React.Dispatch<React.SetStateAction<UpdateSubData>>;
}

interface DeleteSubActivityModalProps {
  title: string;
  subActivity_id: string;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDefaultIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSubActivityModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DefaultModalProps {
  subActivity: SubActivity;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDefaultIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SubActivityModalProps {
  subActivity: SubActivity;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ConfirmUpdateModalProps {
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDefaultModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSubActivityModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subActivity_id: string;
  status: 'pending' | 'finished';
}

const ConfirmModal: React.FC<ConfirmUpdateModalProps> = ({
  isOpen,
  setModalIsOpen,
  setDefaultModalIsOpen,
  setSubActivityModalIsOpen,
  subActivity_id,
  status,
}) => {
  const { updateSubActivityStatus } = useActivity();

  const handleCancelUpdateStatus = useCallback(() => {
    setSubActivityModalIsOpen(true);
    setModalIsOpen(false);
  }, [setSubActivityModalIsOpen, setModalIsOpen]);

  const handleUpdateStatus = useCallback(() => {
    updateSubActivityStatus(subActivity_id, status);
    setDefaultModalIsOpen(false);
    setSubActivityModalIsOpen(false);
    setModalIsOpen(false);
  }, [
    subActivity_id,
    status,
    updateSubActivityStatus,
    setDefaultModalIsOpen,
    setSubActivityModalIsOpen,
    setModalIsOpen,
  ]);

  return (
    <ReactModal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={() => setModalIsOpen(false)}
    >
      <ModalContainer>
        <Container medium>
          <MaterialIcons
            name={status === 'pending' ? 'playlist-add' : 'playlist-add-check'}
            size={85}
            color="#EB3349"
          />
          <Info>
            {status === 'pending'
              ? 'Deseja iniciar a sub-atividade?'
              : 'Deseja concluir a sub-atividade?'}
          </Info>
        </Container>
        <Buttons>
          <Button onPress={handleCancelUpdateStatus}>
            <Feather name="x" size={50} color="#EB3349" />
          </Button>
          <Button green onPress={handleUpdateStatus}>
            <Feather name="check" size={45} color="#fff" />
          </Button>
        </Buttons>
      </ModalContainer>
    </ReactModal>
  );
};

const EditModal: React.FC<EditSubActivityModalProps> = ({
  isOpen,
  setModalIsOpen,
  setDefaultIsOpen,
  setSubActivityModalIsOpen,
  updateData,
  setUpdateData,
}) => {
  const { updateSubActivity } = useActivity();

  const handleCancelDelete = useCallback(() => {
    setDefaultIsOpen(false);
    setSubActivityModalIsOpen(true);
  }, [setSubActivityModalIsOpen, setDefaultIsOpen]);

  const handleSubmit = useCallback(() => {
    updateSubActivity(updateData);
    setModalIsOpen(false);
    setSubActivityModalIsOpen(false);
    setDefaultIsOpen(false);
  }, [
    updateData,
    updateSubActivity,
    setSubActivityModalIsOpen,
    setDefaultIsOpen,
    setModalIsOpen,
  ]);

  return (
    <ReactModal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={handleCancelDelete}
    >
      <ModalContainer>
        <ActivityEdit
          type="subUpdate"
          updateData={updateData as UpdateData}
          setUpdateData={
            setUpdateData as React.Dispatch<React.SetStateAction<UpdateData>>
          }
        />
        <Buttons>
          <Button onPress={handleCancelDelete}>
            <Feather name="x" size={50} color="#EB3349" />
          </Button>
          <Button green onPress={handleSubmit}>
            <Feather name="check" size={45} color="#fff" />
          </Button>
        </Buttons>
      </ModalContainer>
    </ReactModal>
  );
};

const DeleteModal: React.FC<DeleteSubActivityModalProps> = ({
  title,
  subActivity_id,
  isOpen,
  setModalIsOpen,
  setDefaultIsOpen,
  setSubActivityModalIsOpen,
}) => {
  const { deleteSubActivity } = useActivity();

  const handleCancelDelete = useCallback(() => {
    setDefaultIsOpen(false);
    setSubActivityModalIsOpen(true);
  }, [setSubActivityModalIsOpen, setDefaultIsOpen]);

  const handleDelete = useCallback(async () => {
    await deleteSubActivity(subActivity_id);
    setModalIsOpen(false);
    setSubActivityModalIsOpen(false);
    setDefaultIsOpen(false);
  }, [
    subActivity_id,
    deleteSubActivity,
    setSubActivityModalIsOpen,
    setDefaultIsOpen,
    setModalIsOpen,
  ]);

  return (
    <ReactModal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={handleCancelDelete}
    >
      <ModalContainer>
        <Container medium>
          <Feather name="trash" size={85} color="#EB3349" />
          <DeleteQuestion>
            Tem certeza que deseja deletar permanentemente a sub-atividade
          </DeleteQuestion>
          <SubName>{`"${title}"`}</SubName>
        </Container>
        <Buttons>
          <Button onPress={handleCancelDelete}>
            <Feather name="x" size={50} color="#EB3349" />
          </Button>
          <Button red onPress={handleDelete}>
            <Feather name="trash" size={35} color="#fff" />
          </Button>
        </Buttons>
      </ModalContainer>
    </ReactModal>
  );
};

const Modal: React.FC<DefaultModalProps> = ({
  subActivity,
  isOpen,
  setModalIsOpen,
  setDefaultIsOpen,
  setEditIsOpen,
  setDeleteIsOpen,
  setConfirmModalIsOpen,
}) => {
  const { user } = useAuth();
  const { userIsResponsible } = useActivity();

  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false);
    setDefaultIsOpen(false);
  }, [setModalIsOpen, setDefaultIsOpen]);

  const handleOpenDeleteSubActivityModal = useCallback(() => {
    setDefaultIsOpen(false);
    setDeleteIsOpen(true);
  }, [setDefaultIsOpen, setDeleteIsOpen]);

  const handleOpenEditSubActivityModal = useCallback(() => {
    setDefaultIsOpen(false);
    setEditIsOpen(true);
  }, [setDefaultIsOpen, setEditIsOpen]);

  const handleUpdateSubActivityStatusModal = useCallback(() => {
    setDefaultIsOpen(false);
    setConfirmModalIsOpen(true);
  }, [setDefaultIsOpen, setConfirmModalIsOpen]);

  return (
    <ReactModal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={handleCloseModal}
    >
      <ModalContainer>
        <Container>
          <Title>{subActivity.title}</Title>
          <SubResponsible>
            {subActivity.responsibles.map(responsible => (
              <SubAvatar
                key={`responsible${Math.random()}`}
                source={{ uri: responsible.avatar_url }}
              />
            ))}
          </SubResponsible>
          <SubDeadline>
            <SubDeadlineText>Prazo:</SubDeadlineText>
            <SubDeadlineDate>
              {formatDate(subActivity.deadline, true)}
            </SubDeadlineDate>
          </SubDeadline>
          <Description>{subActivity.description}</Description>
          <Status>
            <StatusName inProgress={subActivity.status === 'pending'}>
              {subActivity.status === 'pending' ? 'Pendente' : 'Solicitado'}
            </StatusName>
            <StatusBar>
              <StatusBarProgress
                inProgress={subActivity.status === 'pending'}
              />
            </StatusBar>
          </Status>
          {subActivity.status === 'pending' ? (
            <CompleteButton onPress={handleUpdateSubActivityStatusModal}>
              Concluir atividade
            </CompleteButton>
          ) : (
            <CompleteButton onPress={handleUpdateSubActivityStatusModal}>
              Iniciar atividade
            </CompleteButton>
          )}
        </Container>
        <Buttons>
          <Button onPress={() => setModalIsOpen(false)}>
            <Feather name="x" size={50} color="#EB3349" />
          </Button>
          {userIsResponsible(user.id) && (
            <>
              <Button onPress={handleOpenEditSubActivityModal}>
                <MaterialIcons name="edit" size={38} color="#EB3349" />
              </Button>
              <Button onPress={handleOpenDeleteSubActivityModal}>
                <Feather name="trash" size={35} color="#EB3349" />
              </Button>
            </>
          )}
        </Buttons>
      </ModalContainer>
    </ReactModal>
  );
};

const SubActivityModal: React.FC<SubActivityModalProps> = ({
  subActivity,
  isOpen,
  setModalIsOpen,
}) => {
  const [defaultModalIsOpen, setDefaultModalIsOpen] = useState(isOpen);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  const { teammates } = useTeam();

  const [updateData, setUpdateData] = useState(() => {
    const responsibles: ActivityUsers[] = teammates.map(user => {
      const matchUser = subActivity.responsibles.find(
        responsible => responsible.id === user.id,
      );

      if (matchUser) {
        return {
          user,
          isSelected: true,
        };
      }

      return {
        user,
        isSelected: false,
      };
    });

    return {
      id: subActivity.id,
      title: subActivity.title,
      description: subActivity.description,
      responsibles,
      deadline: formatISO(addDays(parseISO(subActivity.deadline), 1), {
        representation: 'date',
      }),
      status: subActivity.status,
    } as UpdateSubData;
  });
  return (
    <>
      <ReactModal
        statusBarTranslucent
        animationType="fade"
        transparent
        visible={isOpen}
      >
        <Background />
        {Platform.OS === 'ios' && (
          <>
            <Modal
              subActivity={subActivity}
              isOpen={defaultModalIsOpen}
              setModalIsOpen={setModalIsOpen}
              setDefaultIsOpen={setDefaultModalIsOpen}
              setEditIsOpen={setEditModalIsOpen}
              setDeleteIsOpen={setDeleteModalIsOpen}
              setConfirmModalIsOpen={setConfirmModalIsOpen}
            />
            <EditModal
              isOpen={editModalIsOpen}
              setModalIsOpen={setModalIsOpen}
              setDefaultIsOpen={setEditModalIsOpen}
              setSubActivityModalIsOpen={setDefaultModalIsOpen}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <DeleteModal
              title={subActivity.title}
              subActivity_id={subActivity.id}
              isOpen={deleteModalIsOpen}
              setModalIsOpen={setModalIsOpen}
              setDefaultIsOpen={setDeleteModalIsOpen}
              setSubActivityModalIsOpen={setDefaultModalIsOpen}
            />
            <ConfirmModal
              isOpen={confirmModalIsOpen}
              setModalIsOpen={setConfirmModalIsOpen}
              subActivity_id={subActivity.id}
              setDefaultModalIsOpen={setModalIsOpen}
              setSubActivityModalIsOpen={setDefaultModalIsOpen}
              status={subActivity.status === 'pending' ? 'finished' : 'pending'}
            />
          </>
        )}
      </ReactModal>
      {Platform.OS === 'android' && (
        <>
          <Modal
            subActivity={subActivity}
            isOpen={defaultModalIsOpen}
            setModalIsOpen={setModalIsOpen}
            setDefaultIsOpen={setDefaultModalIsOpen}
            setEditIsOpen={setEditModalIsOpen}
            setDeleteIsOpen={setDeleteModalIsOpen}
            setConfirmModalIsOpen={setConfirmModalIsOpen}
          />
          <EditModal
            isOpen={editModalIsOpen}
            setModalIsOpen={setModalIsOpen}
            setDefaultIsOpen={setEditModalIsOpen}
            setSubActivityModalIsOpen={setDefaultModalIsOpen}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />
          <DeleteModal
            title={subActivity.title}
            subActivity_id={subActivity.id}
            isOpen={deleteModalIsOpen}
            setModalIsOpen={setModalIsOpen}
            setDefaultIsOpen={setDeleteModalIsOpen}
            setSubActivityModalIsOpen={setDefaultModalIsOpen}
          />
          <ConfirmModal
            isOpen={confirmModalIsOpen}
            setModalIsOpen={setConfirmModalIsOpen}
            subActivity_id={subActivity.id}
            setDefaultModalIsOpen={setModalIsOpen}
            setSubActivityModalIsOpen={setDefaultModalIsOpen}
            status={subActivity.status === 'pending' ? 'finished' : 'pending'}
          />
        </>
      )}
    </>
  );
};

export default SubActivityModal;
