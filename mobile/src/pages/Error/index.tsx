import React from 'react';
import { Feather } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Gradient, Message, Button } from './styles';

interface RouteParams {
  text: string;
  redirect: string;
}

const Error: React.FC = () => {
  const { navigate } = useNavigation();
  const route = useRoute();
  const { text, redirect } = route.params as RouteParams;

  return (
    <Gradient colors={['#EB3349', '#F45C43']} start={[0, 0.5]} end={[1, 0.5]}>
      <Feather name="x" size={140} color="#fafaf9" />
      <Message>{text}</Message>
      <Button white onPress={() => navigate(redirect)}>
        Tentar novamente
      </Button>
    </Gradient>
  );
};

export default Error;
