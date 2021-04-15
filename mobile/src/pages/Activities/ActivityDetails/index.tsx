import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isPast, parseISO, addDays } from 'date-fns';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import EditActivityModal from '../../../components/Modal/EditActivityModal';
import SubActivityModal from '../../../components/Modal/SubActivityModal';
import ConfirmUpdateModal from '../../../components/Modal/ConfirmUpdateModal';
import ActivityResponsibleCard from '../../../components/ActivityResponsibleCard';
import Button from '../../../components/Button';

import { useAuth } from '../../../hooks/auth';
import { useActivity } from '../../../hooks/activity';
import { useTeam } from '../../../hooks/team';

import formatDate from '../../../utils/formatDate';
import shadow from '../../../utils/shadow';

import { SubActivity } from '../MyActivities';

import {
  Container,
  Header,
  Buttons,
  Name,
  Deadline,
  Wave,
  Content,
  DetailsCard,
  CardTitle,
  Description,
  Status,
  StatusName,
  StatusBar,
  StatusBarProgress,
  Responsibles,
  SectionTitle,
  City,
  CityInfo,
  CityAvatar,
  CityName,
  CityUf,
  SubCard,
  SubResponsible,
  SubAvatar,
  SubDeadline,
  SubDeadlineText,
  SubDeadlineDate,
  AddSubActivityButton,
  ButtonGradient,
  AddSubActivityButtonText,
  Late,
  LateText,
} from './styles';

const ActivityDetails: React.FC = () => {
  const { goBack, navigate } = useNavigation();
  const { selectedActivity: activity, userIsResponsible } = useActivity();
  const { user } = useAuth();
  const { getTeammate } = useTeam();

  const [editModalIsOpen, seteditModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [subActivityModalIsOpen, setSubActivityModalIsOpen] = useState(false);
  const [selectedSubActivity, setSelectedSubActivity] = useState(
    {} as SubActivity,
  );
  const [confirmUpdateModalIsOpen, setConfirmUpdateModalIsOpen] = useState(
    false,
  );

  const handleOpenSubActivityModal = useCallback(subActivity => {
    setSelectedSubActivity(subActivity);
    setSubActivityModalIsOpen(true);
  }, []);

  const handleNavigateToUserDetails = useCallback(
    (user_id: string) => {
      if (user_id === user.id) {
        return null;
      }

      return navigate('ActivityUser', { user: getTeammate(user_id) });
    },
    [user.id, navigate, getTeammate],
  );

  return (
    <>
      {editModalIsOpen && (
        <EditActivityModal
          type="update"
          activity={activity}
          isOpen={editModalIsOpen}
          setModalIsOpen={seteditModalIsOpen}
        />
      )}
      {createModalIsOpen && (
        <EditActivityModal
          type="subCreate"
          isOpen={createModalIsOpen}
          setModalIsOpen={setCreateModalIsOpen}
        />
      )}
      {subActivityModalIsOpen && (
        <SubActivityModal
          isOpen={subActivityModalIsOpen}
          setModalIsOpen={setSubActivityModalIsOpen}
          subActivity={selectedSubActivity}
        />
      )}
      {confirmUpdateModalIsOpen && (
        <ConfirmUpdateModal
          isOpen={confirmUpdateModalIsOpen}
          setModalIsOpen={setConfirmUpdateModalIsOpen}
          activity_id={activity.id}
          status={activity.status === 'pending' ? 'finished' : 'pending'}
        />
      )}
      <Container>
        <Header colors={['#EB3349', '#F45C43']} start={[0, 0.5]} end={[1, 0.5]}>
          <Buttons>
            <TouchableOpacity onPress={() => goBack()}>
              <Feather name="chevron-left" color="#fff" size={30} />
            </TouchableOpacity>
            {user.id === activity.requester.id && (
              <TouchableOpacity onPress={() => seteditModalIsOpen(true)}>
                <MaterialIcons name="edit" color="#fff" size={25} />
              </TouchableOpacity>
            )}
          </Buttons>
          <Name>{activity.title}</Name>
          <Deadline>{formatDate(activity.deadline, true)}</Deadline>
          <Wave source={require('../../../assets/citydetail-wave.png')} />
        </Header>
        <DetailsCard style={shadow}>
          <CardTitle>Descrição</CardTitle>
          <Description>{activity.description}</Description>
          <Status>
            <StatusName inProgress={activity.status === 'pending'}>
              {activity.status === 'pending' ? 'Pendente' : 'Solicitado'}
            </StatusName>
            <StatusBar>
              <StatusBarProgress inProgress={activity.status === 'pending'} />
            </StatusBar>
          </Status>
        </DetailsCard>
        <Responsibles
          horizontal
          showsHorizontalScrollIndicator={false}
          overScrollMode="never"
        >
          <ActivityResponsibleCard
            onPress={() => handleNavigateToUserDetails(activity.requester.id)}
            isRequester
            name={activity.requester.name.split(' ')[0]}
            avatar_url={activity.requester.avatar_url}
          />
          {activity.responsibles.map(responsible => (
            <ActivityResponsibleCard
              onPress={() => handleNavigateToUserDetails(responsible.id)}
              key={responsible.id}
              name={responsible.name.split(' ')[0]}
              avatar_url={responsible.avatar_url}
            />
          ))}
        </Responsibles>
        <Content>
          <SectionTitle>Municípios</SectionTitle>
          {activity.cities.map(city => (
            <City
              onPress={() => navigate('ActivityCities', { city_id: city.id })}
              activeOpacity={0.8}
              style={shadow}
              key={city.id}
            >
              <CityInfo>
                <CityAvatar source={{ uri: city.avatar }} />
                <CityName>{city.name}</CityName>
              </CityInfo>
              <CityUf>{city.uf}</CityUf>
            </City>
          ))}
          {activity.status === 'pending' && (
            <>
              <SectionTitle>Sub-atividades</SectionTitle>
              {activity.subActivities.length === 0 && (
                <Description style={{ textAlign: 'center', marginBottom: 10 }}>
                  Não há sub-atividades pendentes,{'\n'}
                  deseja criar uma?
                </Description>
              )}
              {activity.subActivities.map(subActivity => (
                <SubCard
                  onPress={() => handleOpenSubActivityModal(subActivity)}
                  key={subActivity.id}
                  late={isPast(addDays(parseISO(subActivity.deadline), 2))}
                  style={shadow}
                  activeOpacity={0.8}
                >
                  {isPast(addDays(parseISO(subActivity.deadline), 2)) && (
                    <Late>
                      <LateText>Atrasada</LateText>
                    </Late>
                  )}
                  <CardTitle>{subActivity.title}</CardTitle>
                  <SubResponsible>
                    {subActivity.responsibles.map(responsible => (
                      <SubAvatar
                        key={responsible.id}
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
                      {subActivity.status === 'pending'
                        ? 'Pendente'
                        : 'Solicitado'}
                    </StatusName>
                    <StatusBar>
                      <StatusBarProgress
                        inProgress={subActivity.status === 'pending'}
                      />
                    </StatusBar>
                  </Status>
                </SubCard>
              ))}
              {userIsResponsible(user.id) && (
                <AddSubActivityButton
                  onPress={() => setCreateModalIsOpen(true)}
                  activeOpacity={0.8}
                >
                  <ButtonGradient
                    colors={['#EB3349', '#F45C43']}
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                  >
                    <AddSubActivityButtonText>
                      Nova sub-atividade
                    </AddSubActivityButtonText>
                  </ButtonGradient>
                </AddSubActivityButton>
              )}
            </>
          )}
          {activity.subActivities.length === 0 ? (
            <Button onPress={() => setConfirmUpdateModalIsOpen(true)} text={18}>
              {activity.status === 'pending'
                ? 'Concluir atividade'
                : 'Iniciar atividade'}
            </Button>
          ) : (
            <Button disabled red text={18}>
              Sub-atividades pendentes
            </Button>
          )}
        </Content>
      </Container>
    </>
  );
};

export default ActivityDetails;
