import React from 'react';
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import formatPhone from '../../utils/formatPhone';
import formatDate from '../../utils/formatDate';
import shadow from '../../utils/shadow';

import { Responsible } from '../../pages/Cities/CityDetails';
import { ResponsiblesType } from '../Responsibles';

import {
  Card,
  Header,
  Linear,
  CardTitle,
  Section,
  Info,
  TypeSection,
  Key,
  Types,
  Type,
  TypeText,
  Qualification,
  NotFound,
} from './styles';

interface ResponsibleCardProps {
  type: ResponsiblesType;
  data: Responsible;
  editMode: boolean;
}

const ResponsibleCard: React.FC<ResponsibleCardProps> = ({
  type,
  data,
  editMode,
}) => {
  if (data) {
    return (
      <>
        <Header>
          <Linear
            colors={['#EB3349', '#F45C43']}
            start={[0, 0.5]}
            end={[1, 0.5]}
          >
            <CardTitle editMode={editMode}>{type}</CardTitle>
          </Linear>
        </Header>
        <Card editMode={editMode} style={shadow}>
          <Section editMode={editMode}>
            <AntDesign name="user" color="#EB3349" size={25} />
            <Info>{data.name}</Info>
          </Section>
          <Section editMode={editMode}>
            <MaterialCommunityIcons
              name="calendar-range-outline"
              color="#EB3349"
              size={25}
            />
            <Info>
              {type === 'Fiscal 1' && formatDate(data.qualification, true)}
              {type === 'Fiscal 2'
                ? formatDate(data.qualification, true)
                : formatDate(data.birth, true)}
            </Info>
            {type === 'Fiscal 1' && (
              <Qualification>(data de habilitação)</Qualification>
            )}
            {type === 'Fiscal 2' && (
              <Qualification>(data de habilitação)</Qualification>
            )}
          </Section>
          <Section editMode={editMode} feather>
            <Feather name="mail" color="#EB3349" size={22} />
            <Info>{data.email}</Info>
          </Section>
          <Section editMode={editMode} feather>
            <Feather name="phone" color="#EB3349" size={21} />
            <Info>{formatPhone(data.phone)}</Info>
          </Section>
          {type === 'Prefeito' ? (
            <TypeSection editMode={editMode}>
              <Key>Reeleito:</Key>
              <Types>
                <Type red selected={data.reelected}>
                  <TypeText red selected={data.reelected}>
                    Não
                  </TypeText>
                </Type>
                <Type green selected={data.reelected}>
                  <TypeText green selected={data.reelected}>
                    Sim
                  </TypeText>
                </Type>
              </Types>
            </TypeSection>
          ) : (
            <Section editMode={editMode} feather>
              <MaterialCommunityIcons
                name="briefcase-outline"
                color="#EB3349"
                size={21}
              />
              <Info>{data.role}</Info>
            </Section>
          )}
        </Card>
      </>
    );
  }

  return (
    <>
      <Header>
        <Linear colors={['#EB3349', '#F45C43']} start={[0, 0.5]} end={[1, 0.5]}>
          <CardTitle editMode={editMode}>{type}</CardTitle>
        </Linear>
      </Header>
      <Card
        editMode={editMode}
        style={
          !editMode
            ? {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,

              elevation: 8,

              alignItems: 'center',
              justifyContent: 'center',
            }
            : {
              alignItems: 'center',
              justifyContent: 'center',
            }
        }
      >
        <AntDesign name="deleteuser" size={60} color="#EB3349" />
        <NotFound>Esse município não possui {type}!</NotFound>
      </Card>
    </>
  );
};

export default ResponsibleCard;
