import React from 'react';

import { useActivity } from '../../../hooks/activity';

import Header from '../../../components/Header';
import ActivityList from '../../../components/ActivityList';

import { Container } from './styles';

const AllActivities: React.FC = () => {
  const { allActivities } = useActivity();

  return (
    <Container>
      <Header>Atividades gerais</Header>
      <ActivityList activities={allActivities} />
    </Container>
  );
};

export default AllActivities;
