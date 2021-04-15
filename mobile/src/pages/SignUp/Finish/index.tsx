import React, { useCallback } from 'react';
import { Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';
import { useSignUp } from '../../../hooks/signup';
import api from '../../../services/api';

import Button from '../../../components/Button';

import { Gradient, Confirmation, Message, Bold } from './styles';

interface RouteParams {
  image: string;
}

const Finish: React.FC = () => {
  const { signIn, updateUser } = useAuth();
  const { user } = useSignUp();
  const route = useRoute();
  const { image } = route.params as RouteParams;

  const handleFinishSignUp = useCallback(async () => {
    await signIn({ email: user.email, password: user.password });

    const data = new FormData();

    data.append('file', {
      type: 'image/jpeg',
      name: `${user.email}.jpg`,
      uri: image,
    });

    api.patch('users/avatar', data).then(apiResponse => {
      updateUser(apiResponse.data);
    });
  }, [signIn, user, image, updateUser]);

  return (
    <Gradient colors={['#EB3349', '#F45C43']} start={[0, 0.5]} end={[1, 0.5]}>
      <Message>
        Bem vindo (a),{'\n'}
        <Bold>{user.name.split(' ', 1)}</Bold>
      </Message>
      <Confirmation>
        <Entypo name="check" size={140} color="#fafaf9" />
        <Message>Seu cadastro foi realizado com sucesso!</Message>
      </Confirmation>
      <Button white onPress={handleFinishSignUp}>
        Entrar
      </Button>
    </Gradient>
  );
};

export default Finish;
