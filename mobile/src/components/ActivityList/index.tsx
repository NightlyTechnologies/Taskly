import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { isPast, parseISO, addDays } from 'date-fns';

import formatDate from '../../utils/formatDate';
import shadow from '../../utils/shadow';

import { useActivity } from '../../hooks/activity';

import { Activity } from '../../pages/Activities/MyActivities';

import upperCaseFirstLetter from '../../utils/upperCaseFirstLetter';

import {
  Container,
  ActivityCard,
  Title,
  Responsibles,
  Avatar,
  Tail,
  Info,
  Deadline,
  DeadlineTitle,
  DeadlineTime,
  Cities,
  City,
  Status,
  StatusName,
  StatusBar,
  StatusBarProgress,
  SubActivity,
  SubTitle,
  SubContent,
  SubResponsibles,
  SubStatus,
  SubStatusText,
  Ligature,
  MoreSubActivities,
  Late,
  LateText,
} from './styles';

interface ActivitiesProps {
  activities: Activity[];
  hasButton?: boolean;
}

const ActivityList: React.FC<ActivitiesProps> = ({ activities, hasButton }) => {
  const { selectActivity } = useActivity();
  const { navigate } = useNavigation();

  const handleNavigateToDetails = useCallback(
    (activity: Activity) => {
      selectActivity(activity);
      navigate('Details');
    },
    [selectActivity, navigate],
  );

  if (!activities) {
    return <></>;
  }

  return (
    <>
      <Container
        data={activities}
        overScrollMode="never"
        hasButton={hasButton}
        showsVerticalScrollIndicator={false}
        keyExtractor={activity => activity.id}
        renderItem={({ item: activity }) => (
          <>
            <ActivityCard
              late={isPast(addDays(parseISO(activity.deadline), 2))}
              style={shadow}
              activeOpacity={0.9}
              onPress={() => handleNavigateToDetails(activity)}
            >
              {isPast(addDays(parseISO(activity.deadline), 2)) && (
                <Late>
                  <LateText>Atrasada</LateText>
                </Late>
              )}
              <Title>{activity.title}</Title>
              <Responsibles>
                <Avatar source={{ uri: activity.requester.avatar_url }} main />
                <Tail>
                  {activity.responsibles.map(responsible => (
                    <Avatar
                      key={`responsible${Math.random()}`}
                      source={{ uri: responsible.avatar_url }}
                    />
                  ))}
                </Tail>
              </Responsibles>
              <Info>
                <Deadline>
                  <DeadlineTitle>Prazo:</DeadlineTitle>
                  <DeadlineTime>
                    {formatDate(activity.deadline, true)}
                  </DeadlineTime>
                </Deadline>
                <Cities>
                  {activity.cities.map(city => (
                    <City key={city.id}>{upperCaseFirstLetter(city.name)}</City>
                  ))}
                </Cities>
              </Info>
              <Status>
                <StatusName inProgress={activity.status === 'pending'}>
                  {activity.status === 'pending' ? 'Pendente' : 'Solicitado'}
                </StatusName>
                <StatusBar>
                  <StatusBarProgress
                    inProgress={activity.status === 'pending'}
                  />
                </StatusBar>
              </Status>
            </ActivityCard>
            {activity.sub_activities[0] !== undefined && (
              <SubActivity key={activity.sub_activities[0].id} style={shadow}>
                <SubTitle>{activity.sub_activities[0].title}</SubTitle>
                <SubContent>
                  <SubResponsibles>
                    {activity.sub_activities[0].responsibles.map(
                      responsible => (
                        <Avatar
                          key={responsible.id}
                          source={{
                            uri: responsible.avatar_url,
                          }}
                          sub
                        />
                      ),
                    )}
                  </SubResponsibles>
                  <SubStatus
                    color={
                      activity.sub_activities[0].status === 'pending'
                        ? '#ffcd00'
                        : '#777'
                    }
                  >
                    <SubStatusText>
                      {activity.sub_activities[0].status === 'pending'
                        ? 'Pendente'
                        : 'Solicitada'}
                    </SubStatusText>
                  </SubStatus>
                </SubContent>
                {activity.sub_activities[0] !== undefined && (
                  <>
                    <Ligature source={require('../../assets/ligature.png')} />
                  </>
                )}
                {activity.sub_activities[1] !== undefined && (
                  <>
                    <Ligature
                      more
                      source={require('../../assets/ligature2.png')}
                    />
                    <MoreSubActivities>
                      {`+${activity.sub_activities.length - 1}`}
                    </MoreSubActivities>
                  </>
                )}
              </SubActivity>
            )}
            {activity.sub_activities[1] !== undefined && (
              <SubActivity belowLevel={1} style={{ ...shadow, elevation: 7 }} />
            )}
            {activity.sub_activities[2] !== undefined && (
              <SubActivity belowLevel={2} style={{ ...shadow, elevation: 6 }} />
            )}
          </>
        )}
      />
    </>
  );
};

export default ActivityList;
