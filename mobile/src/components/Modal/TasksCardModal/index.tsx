import React, { useState, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Modal as ReactModal,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCity } from '../../../hooks/city';

import { Tasks } from '../../../pages/Cities/CityDetails';

import {
  Container,
  Title,
  Section,
  Key,
  Types,
  Type,
  TypeText,
  Divider,
  ModalContainer,
  Background,
  Buttons,
  Cancel,
  Submit,
} from './styles';

interface TasksCardModalProps {
  data: Tasks;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<TasksCardModalProps> = ({
  data,
  isOpen,
  setModalIsOpen,
}) => {
  const { updateCity } = useCity();

  const [editData, setEditData] = useState<Tasks>({} as Tasks);
  const [tasks, setTasks] = useState<Tasks>({} as Tasks);

  const handleSubmitModalEdit = useCallback(() => {
    updateCity({ data: editData, type: 'tasks' });

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
            <Title>Atividades</Title>
            <Section>
              <Key>Adutitoria 2020</Key>
              <Types>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, audit1: false });
                    setTasks({ ...tasks, audit1: true });
                  }}
                  red
                  selected={tasks.audit1 ? editData.audit1 : data.audit1}
                >
                  <TypeText
                    red
                    selected={tasks.audit1 ? editData.audit1 : data.audit1}
                  >
                    Não
                  </TypeText>
                </Type>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, audit1: true });
                    setTasks({ ...tasks, audit1: true });
                  }}
                  green
                  selected={tasks.audit1 ? editData.audit1 : data.audit1}
                >
                  <TypeText
                    green
                    selected={tasks.audit1 ? editData.audit1 : data.audit1}
                  >
                    Sim
                  </TypeText>
                </Type>
              </Types>
            </Section>
            <Divider />
            <Section>
              <Key>Adutitoria 2019</Key>
              <Types>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, audit2: false });
                    setTasks({ ...tasks, audit2: true });
                  }}
                  red
                  selected={tasks.audit2 ? editData.audit2 : data.audit2}
                >
                  <TypeText
                    red
                    selected={tasks.audit2 ? editData.audit2 : data.audit2}
                  >
                    Não
                  </TypeText>
                </Type>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, audit2: true });
                    setTasks({ ...tasks, audit2: true });
                  }}
                  green
                  selected={tasks.audit2 ? editData.audit2 : data.audit2}
                >
                  <TypeText
                    green
                    selected={tasks.audit2 ? editData.audit2 : data.audit2}
                  >
                    Sim
                  </TypeText>
                </Type>
              </Types>
            </Section>
            <Divider />
            <Section>
              <Key>Adutitoria 2018</Key>
              <Types>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, audit3: false });
                    setTasks({ ...tasks, audit3: true });
                  }}
                  red
                  selected={tasks.audit3 ? editData.audit3 : data.audit3}
                >
                  <TypeText
                    red
                    selected={tasks.audit3 ? editData.audit3 : data.audit3}
                  >
                    Não
                  </TypeText>
                </Type>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, audit3: true });
                    setTasks({ ...tasks, audit3: true });
                  }}
                  green
                  selected={tasks.audit3 ? editData.audit3 : data.audit3}
                >
                  <TypeText
                    green
                    selected={tasks.audit3 ? editData.audit3 : data.audit3}
                  >
                    Sim
                  </TypeText>
                </Type>
              </Types>
            </Section>
            <Divider />
            <Section>
              <Key>Adutitoria 2017</Key>
              <Types>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, audit4: false });
                    setTasks({ ...tasks, audit4: true });
                  }}
                  red
                  selected={tasks.audit4 ? editData.audit4 : data.audit4}
                >
                  <TypeText
                    red
                    selected={tasks.audit4 ? editData.audit4 : data.audit4}
                  >
                    Não
                  </TypeText>
                </Type>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, audit4: true });
                    setTasks({ ...tasks, audit4: true });
                  }}
                  green
                  selected={tasks.audit4 ? editData.audit4 : data.audit4}
                >
                  <TypeText
                    green
                    selected={tasks.audit4 ? editData.audit4 : data.audit4}
                  >
                    Sim
                  </TypeText>
                </Type>
              </Types>
            </Section>
            <Divider />
            <Section>
              <Key>Adutitoria 2016</Key>
              <Types>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, audit5: false });
                    setTasks({ ...tasks, audit5: true });
                  }}
                  red
                  selected={tasks.audit5 ? editData.audit5 : data.audit5}
                >
                  <TypeText
                    red
                    selected={tasks.audit5 ? editData.audit5 : data.audit5}
                  >
                    Não
                  </TypeText>
                </Type>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, audit5: true });
                    setTasks({ ...tasks, audit5: true });
                  }}
                  green
                  selected={tasks.audit5 ? editData.audit5 : data.audit5}
                >
                  <TypeText
                    green
                    selected={tasks.audit5 ? editData.audit5 : data.audit5}
                  >
                    Sim
                  </TypeText>
                </Type>
              </Types>
            </Section>
            <Divider />
            <Section>
              <Key>
                Importação de {'\n'}
                CAFIR
              </Key>
              <Types>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, cafirs: false });
                    setTasks({ ...tasks, cafirs: true });
                  }}
                  red
                  selected={tasks.cafirs ? editData.cafirs : data.cafirs}
                >
                  <TypeText
                    red
                    selected={tasks.cafirs ? editData.cafirs : data.cafirs}
                  >
                    Não
                  </TypeText>
                </Type>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, cafirs: true });
                    setTasks({ ...tasks, cafirs: true });
                  }}
                  green
                  selected={tasks.cafirs ? editData.cafirs : data.cafirs}
                >
                  <TypeText
                    green
                    selected={tasks.cafirs ? editData.cafirs : data.cafirs}
                  >
                    Sim
                  </TypeText>
                </Type>
              </Types>
            </Section>
            <Divider />
            <Section>
              <Key>
                Levantamento de {'\n'}
                Divergências
              </Key>
              <Types>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, diffs: false });
                    setTasks({ ...tasks, diffs: true });
                  }}
                  red
                  selected={tasks.diffs ? editData.diffs : data.diffs}
                >
                  <TypeText
                    red
                    selected={tasks.diffs ? editData.diffs : data.diffs}
                  >
                    Não
                  </TypeText>
                </Type>
                <Type
                  onPress={() => {
                    setEditData({ ...editData, diffs: true });
                    setTasks({ ...tasks, diffs: true });
                  }}
                  green
                  selected={tasks.diffs ? editData.diffs : data.diffs}
                >
                  <TypeText
                    green
                    selected={tasks.diffs ? editData.diffs : data.diffs}
                  >
                    Sim
                  </TypeText>
                </Type>
              </Types>
            </Section>
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

const TasksCardModal: React.FC<TasksCardModalProps> = ({
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

export default TasksCardModal;
