import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useTeam } from '../../../hooks/team';

import Header from '../../../components/Header';

import shadow from '../../../utils/shadow';

import { Container, UserList, Card, Avatar, Name } from './styles';

const Team: React.FC = () => {
  const { teammates } = useTeam();
  const { navigate } = useNavigation();

  return (
    <Container>
      <Header>Equipe</Header>
      <UserList
        data={teammates}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        keyExtractor={user => user.id}
        renderItem={({ item: user }) => (
          <Card
            onPress={() => navigate('Teammate', { user })}
            activeOpacity={0.9}
            style={shadow}
          >
            <Avatar source={{ uri: user.avatar_url }} />
            <Name>{user.name}</Name>
          </Card>
        )}
      />
    </Container>
  );
};

export default Team;
