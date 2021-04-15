import React, { useState, useCallback } from 'react';
import {
  Platform,
  Modal as ReactModal,
  KeyboardAvoidingView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { formatISO, parseISO, addDays } from 'date-fns';
import { useNavigation } from '@react-navigation/core';

import ActivityEdit from '../../ActivityEdit';

import { useTeam, User } from '../../../hooks/team';
import { useCity } from '../../../hooks/city';
import { useAuth } from '../../../hooks/auth';
import { useActivity, UpdateData } from '../../../hooks/activity';

import { City } from '../../../pages/Cities/CityList';
import { Activity } from '../../../pages/Activities/MyActivities';

import {
  ModalContainer,
  Container,
  DeleteQuestion,
  Title,
  Background,
  Buttons,
  Cancel,
  Delete,
  Submit,
} from './styles';

interface ActivityUsers {
  user: User;
  isSelected: boolean;
}

interface ActivityCities {
  city: City;
  isSelected: boolean;
}

interface EditActivityModalProps {
  type: 'update' | 'create' | 'subUpdate' | 'subCreate';
  activity?: Activity;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DeleteActivityModalProps {
  title: string;
  activity_id: string;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDefaultIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalProps {
  type: 'update' | 'create' | 'subUpdate' | 'subCreate';
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDefaultIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activityAction: (updateData: UpdateData) => void;
  updateData: UpdateData;
  setUpdateData: React.Dispatch<React.SetStateAction<UpdateData>>;
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({
  type,
  isOpen,
  setModalIsOpen,
  setDefaultIsOpen,
  activityAction,
  updateData,
  setUpdateData,
  setDeleteModalIsOpen,
}) => {
  const handleCancelUpdate = useCallback(() => {
    setUpdateData({} as UpdateData);
    setDefaultIsOpen(false);
  }, [setUpdateData, setDefaultIsOpen]);

  const handleDeleteActivity = useCallback(() => {
    setDeleteModalIsOpen(true);
    setModalIsOpen(false);
  }, [setDeleteModalIsOpen, setModalIsOpen]);

  const handleSubmitUpdate = useCallback(() => {
    activityAction(updateData);
    setDefaultIsOpen(false);
  }, [activityAction, updateData, setDefaultIsOpen]);

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
          <ActivityEdit
            type={type}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />
          <Buttons>
            <Cancel onPress={handleCancelUpdate}>
              <Feather name="x" size={50} color="#EB3349" />
            </Cancel>
            {type !== 'create' && type !== 'subCreate' && (
              <Cancel onPress={handleDeleteActivity}>
                <Feather name="trash" size={35} color="#EB3349" />
              </Cancel>
            )}
            <Submit onPress={handleSubmitUpdate}>
              <Feather name="check" size={45} color="#fff" />
            </Submit>
          </Buttons>
        </ModalContainer>
      </KeyboardAvoidingView>
    </ReactModal>
  );
};

const DeleteModal: React.FC<DeleteActivityModalProps> = ({
  title,
  activity_id,
  isOpen,
  setModalIsOpen,
  setDefaultIsOpen,
  setEditModalIsOpen,
}) => {
  const { deleteActivity } = useActivity();
  const { goBack } = useNavigation();

  const handleCancelDelete = useCallback(() => {
    setModalIsOpen(false);
    setEditModalIsOpen(true);
  }, [setEditModalIsOpen, setModalIsOpen]);

  const handleDelete = useCallback(() => {
    goBack();
    deleteActivity(activity_id);
    setModalIsOpen(false);
    setDefaultIsOpen(false);
    setEditModalIsOpen(false);
  }, [
    goBack,
    activity_id,
    deleteActivity,
    setEditModalIsOpen,
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
        <Container>
          <Feather name="trash" size={85} color="#EB3349" />
          <DeleteQuestion>
            Tem certeza que deseja deletar permanentemente a atividade
          </DeleteQuestion>
          <Title>{`"${title}"`}</Title>
        </Container>
        <Buttons>
          <Cancel onPress={handleCancelDelete}>
            <Feather name="x" size={50} color="#EB3349" />
          </Cancel>
          <Delete onPress={handleDelete}>
            <Feather name="trash" size={35} color="#fff" />
          </Delete>
        </Buttons>
      </ModalContainer>
    </ReactModal>
  );
};

const EditActivityModal: React.FC<EditActivityModalProps> = ({
  type,
  activity,
  isOpen,
  setModalIsOpen,
}) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(isOpen);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const {
    addActivity,
    updateActivity,
    addSubActivity,
    updateSubActivity,
  } = useActivity();
  const { teammates } = useTeam();
  const { cities: allCities } = useCity();
  const { user: requester } = useAuth();

  const activityAction = {
    create: addActivity,
    update: updateActivity,
    subCreate: addSubActivity,
    subUpdate: updateSubActivity,
  };

  const [updateData, setUpdateData] = useState(() => {
    if (activity && type === 'update') {
      const responsibles: ActivityUsers[] = teammates.map(user => {
        const matchUser = activity.responsibles.find(
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

      const cities: ActivityCities[] = allCities.map(city => {
        const matchCity = activity.cities.find(
          activityCity => activityCity.id === city.id,
        );

        if (matchCity) {
          return {
            city,
            isSelected: true,
          };
        }

        return {
          city,
          isSelected: false,
        };
      });

      return {
        id: activity.id,
        title: activity.title,
        description: activity.description,
        requester: activity.requester,
        responsibles,
        cities,
        deadline: formatISO(addDays(parseISO(activity.deadline), 1), {
          representation: 'date',
        }),
        status: activity?.status,
      } as UpdateData;
    }
    if (type === 'subCreate') {
      const responsibles: ActivityUsers[] = teammates.map(user => ({
        user,
        isSelected: false,
      }));

      return {
        responsibles,
        deadline: formatISO(new Date(Date.now()), {
          representation: 'date',
        }),
        status: 'requested',
      } as UpdateData;
    }

    const responsibles: ActivityUsers[] = teammates.map(user => ({
      user,
      isSelected: false,
    }));

    const cities: ActivityCities[] = allCities.map(city => ({
      city,
      isSelected: false,
    }));

    return {
      responsibles,
      cities,
      requester: {
        id: requester.id,
        name: requester.name,
        avatar_url: requester.avatar_url,
      },
      deadline: formatISO(new Date(Date.now()), {
        representation: 'date',
      }),
      status: 'requested',
    } as UpdateData;
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
              type={type}
              isOpen={editModalIsOpen}
              setModalIsOpen={setEditModalIsOpen}
              setDefaultIsOpen={setModalIsOpen}
              activityAction={activityAction[type]}
              updateData={updateData}
              setUpdateData={setUpdateData}
              setDeleteModalIsOpen={setDeleteModalIsOpen}
            />
            <DeleteModal
              title={activity?.title || 'Atividade'}
              activity_id={activity?.id || ''}
              isOpen={deleteModalIsOpen}
              setModalIsOpen={setDeleteModalIsOpen}
              setEditModalIsOpen={setEditModalIsOpen}
              setDefaultIsOpen={setModalIsOpen}
            />
          </>
        )}
      </ReactModal>
      {Platform.OS === 'android' && (
        <>
          <Modal
            type={type}
            isOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            setDefaultIsOpen={setModalIsOpen}
            activityAction={activityAction[type]}
            updateData={updateData}
            setUpdateData={setUpdateData}
            setDeleteModalIsOpen={setDeleteModalIsOpen}
          />
          <DeleteModal
            title={activity?.title || 'Atividade'}
            activity_id={activity?.id || ''}
            isOpen={deleteModalIsOpen}
            setModalIsOpen={setDeleteModalIsOpen}
            setEditModalIsOpen={setEditModalIsOpen}
            setDefaultIsOpen={setModalIsOpen}
          />
        </>
      )}
    </>
  );
};

export default EditActivityModal;
