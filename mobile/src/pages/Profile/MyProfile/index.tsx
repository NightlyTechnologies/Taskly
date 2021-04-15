import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useAuth } from '../../../hooks/auth';

import EditProfileModal from '../../../components/Modal/EditProfileModal';
import Header from '../../../components/Header';

import formatPhone from '../../../utils/formatPhone';
import formatCpf from '../../../utils/formatCpf';

import {
  Container,
  TopElements,
  Avatar,
  Welcome,
  Name,
  Data,
  Section,
  Info,
  // History,
} from './styles';

const MyProfile: React.FC = () => {
  const { user, signOut } = useAuth();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <EditProfileModal
        user={user}
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <Header>Meu perfil</Header>
      <Container overScrollMode="never" showsVerticalScrollIndicator={false}>
        <TopElements>
          <TouchableOpacity onPress={() => signOut()}>
            <Feather name="log-out" color="#ed3f47" size={25} />
          </TouchableOpacity>
          <Avatar
            source={{
              uri: user.avatar_url,
            }}
          />
          <TouchableOpacity onPress={() => setModalIsOpen(true)}>
            <MaterialIcons name="edit" color="#ed3f47" size={25} />
          </TouchableOpacity>
        </TopElements>
        <Welcome>Bem vindo(a),</Welcome>
        <Name>{user.firstName}</Name>
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

export default MyProfile;
