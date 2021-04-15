import React from 'react';
import { useRoute } from '@react-navigation/native';
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { User } from '../../../hooks/team';

import Header from '../../../components/Header';

import formatPhone from '../../../utils/formatPhone';
import formatCpf from '../../../utils/formatCpf';

import {
  Container,
  Avatar,
  Name,
  Data,
  Section,
  Info,
  // History,
} from './styles';

interface RouteParams {
  user: User;
}

const Teammate: React.FC = () => {
  const route = useRoute();

  const { user } = route.params as RouteParams;

  return (
    <>
      <Header haveBackArrow>Perfil de colega</Header>
      <Container overScrollMode="never" showsVerticalScrollIndicator={false}>
        <Avatar
          source={{
            uri: user.avatar_url,
          }}
        />

        <Name>{user.name.split(' ', 1)}</Name>
        <Data>
          <Section>
            <AntDesign name="user" size={20} color="#ed3f47" />
            <Info>{user.name}</Info>
          </Section>
          <Section>
            <Feather name="mail" size={20} color="#ed3f47" />
            <Info>{user.email}</Info>
          </Section>
          <Section>
            <Feather name="phone" size={20} color="#ed3f47" />
            <Info>{formatPhone(user.phone)}</Info>
          </Section>
          <Section>
            <FontAwesome5 name="address-card" size={20} color="#ed3f47" />
            <Info>{formatCpf(user.cpf)}</Info>
          </Section>
          <Section>
            <FontAwesome5 name="address-card" size={20} color="#ed3f47" />
            <Info>{user.rg}</Info>
          </Section>
          <Section>
            <MaterialCommunityIcons
              name="city-variant-outline"
              size={20}
              color="#ed3f47"
            />
            <Info>
              {user.city} - {user.uf}
            </Info>
          </Section>
          <Section>
            <Feather name="home" size={20} color="#ed3f47" />
            <Info>{user.address}</Info>
          </Section>
        </Data>
        {/* <History text={18}>Visualisar histórico de atividades</History> */}
      </Container>
    </>
  );
};

export default Teammate;
