import React from 'react';
import { useCity } from '../../hooks/city';

import EditButton from '../EditButton';

import { Tasks } from '../../pages/Cities/CityDetails';

import {
  Container,
  Title,
  Section,
  Key,
  Types,
  Type,
  TypeText,
  Divider,
} from './styles';

interface TasksCardProps {
  tasks: Tasks;
  editMode: boolean;
}

const TasksCard: React.FC<TasksCardProps> = ({ tasks, editMode }) => {
  const { dataWasModify } = useCity();

  if (tasks) {
    return (
      <>
        {editMode && (
          <EditButton
            type="tasks"
            text="Atividades"
            modal="tasks"
            modalData={tasks}
            finished={dataWasModify.tasksWasModify}
          />
        )}
        <Title>Atividades</Title>
        <Container
          editMode={editMode}
          style={
            !editMode && {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,

              elevation: 8,
            }
          }
        >
          <Section>
            <Key>Adutitoria 2020</Key>
            <Types>
              <Type red selected={tasks.audit1}>
                <TypeText red selected={tasks.audit1}>
                  Não
                </TypeText>
              </Type>
              <Type green selected={tasks.audit1}>
                <TypeText green selected={tasks.audit1}>
                  Sim
                </TypeText>
              </Type>
            </Types>
          </Section>
          <Divider />
          <Section>
            <Key>Adutitoria 2019</Key>
            <Types>
              <Type red selected={tasks.audit2}>
                <TypeText red selected={tasks.audit2}>
                  Não
                </TypeText>
              </Type>
              <Type green selected={tasks.audit2}>
                <TypeText green selected={tasks.audit2}>
                  Sim
                </TypeText>
              </Type>
            </Types>
          </Section>
          <Divider />
          <Section>
            <Key>Adutitoria 2018</Key>
            <Types>
              <Type red selected={tasks.audit3}>
                <TypeText red selected={tasks.audit3}>
                  Não
                </TypeText>
              </Type>
              <Type green selected={tasks.audit3}>
                <TypeText green selected={tasks.audit3}>
                  Sim
                </TypeText>
              </Type>
            </Types>
          </Section>
          <Divider />
          <Section>
            <Key>Adutitoria 2017</Key>
            <Types>
              <Type red selected={tasks.audit4}>
                <TypeText red selected={tasks.audit4}>
                  Não
                </TypeText>
              </Type>
              <Type green selected={tasks.audit4}>
                <TypeText green selected={tasks.audit4}>
                  Sim
                </TypeText>
              </Type>
            </Types>
          </Section>
          <Divider />
          <Section>
            <Key>Adutitoria 2016</Key>
            <Types>
              <Type red selected={tasks.audit5}>
                <TypeText red selected={tasks.audit5}>
                  Não
                </TypeText>
              </Type>
              <Type green selected={tasks.audit5}>
                <TypeText green selected={tasks.audit5}>
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
              <Type red selected={tasks.cafirs}>
                <TypeText red selected={tasks.cafirs}>
                  Não
                </TypeText>
              </Type>
              <Type green selected={tasks.cafirs}>
                <TypeText green selected={tasks.cafirs}>
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
              <Type red selected={tasks.diffs}>
                <TypeText red selected={tasks.diffs}>
                  Não
                </TypeText>
              </Type>
              <Type green selected={tasks.diffs}>
                <TypeText green selected={tasks.diffs}>
                  Sim
                </TypeText>
              </Type>
            </Types>
          </Section>
        </Container>
      </>
    );
  }

  return <></>;
};

export default TasksCard;
