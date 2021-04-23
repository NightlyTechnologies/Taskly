import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { useActivity } from '../../../hooks/activity';

import AddActivityModal from '../../../components/Modal/EditActivityModal';
import Header from '../../../components/Header';
import ActivityList from '../../../components/ActivityList';

import { Container, AddActivity, Linear } from './styles';

export interface City {
  id: string;
  avatar_url: string;
  name: string;
  uf: string;
}

export interface Responsible {
  id: string;
  name: string;
  avatar_url: string;
}

export interface SubActivity {
  id: string;
  title: string;
  responsibles: Responsible[];
  deadline: string;
  description: string;
  status: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  requester: Responsible;
  responsibles: Responsible[];
  cities: City[];
  sub_activities: SubActivity[];
  deadline: string;
  status: string;
}

const MyActivities: React.FC = () => {
  const { myActivities } = useActivity();

  const [addActivityModalIsOpen, setAddActivityModalIsOpen] = useState(false);

  return (
    <Container>
      {addActivityModalIsOpen && (
        <AddActivityModal
          type="create"
          isOpen={addActivityModalIsOpen}
          setModalIsOpen={setAddActivityModalIsOpen}
        />
      )}
      <AddActivity
        activeOpacity={0.8}
        onPress={() => setAddActivityModalIsOpen(true)}
      >
        <Linear colors={['#EB3349', '#F45C43']} start={[0, 0.5]} end={[1, 0.5]}>
          <Feather name="plus" size={50} color="#fff" />
        </Linear>
      </AddActivity>
      <Header>Minhas atividades</Header>
      <ActivityList hasButton activities={myActivities} />
    </Container>
  );
};

export default MyActivities;
