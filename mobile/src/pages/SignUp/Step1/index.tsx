import React, { useRef, useCallback, useState } from 'react';
import { TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useSignUp } from '../../../hooks/signup';

import Input from '../../../components/Input';

import DismissKeyboard from '../../../utils/dismissKeyboard';

import {
  Container,
  IconContainer,
  Content,
  Wave,
  Form,
  Title,
  Description,
  Bold,
  LoginButton,
  Button,
} from './styles';

export interface Step1FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const { submitStep1 } = useSignUp();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [data, setData] = useState<Step1FormData>({} as Step1FormData);

  const handleAdvanceStep = useCallback(() => {
    submitStep1(data);
    navigate('Step2');
  }, [navigate, submitStep1, data]);

  return (
    <DismissKeyboard>
      <Container>
        <LinearGradient
          colors={['#EB3349', '#F45C43']}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <IconContainer onPress={goBack}>
            <Feather name="chevron-left" color="#fff" size={30} />
          </IconContainer>
          <Title>Primeiro, suas credênciais:</Title>
          <Wave source={require('../../../assets/wave.png')} />
        </LinearGradient>
        <Content>
          <Description>
            Aqui você deve colocar seu <Bold>Nome</Bold>, <Bold>Email</Bold> e{' '}
            <Bold>Senha</Bold>.
          </Description>
          <Description>
            <Bold>Lembre-se:</Bold> seu Email e Senha serão utilizados para você
            entrar na sua conta a próxima vez que entrar no aplcativo, ok?
          </Description>
        </Content>
        <TouchableOpacity onPress={() => navigate('Login')}>
          <LoginButton>
            Já possui uma conta? <Bold>Clique aqui!</Bold>
          </LoginButton>
        </TouchableOpacity>
        <Form>
          <Input
            pack="ant"
            icon="user"
            placeholder="Nome"
            autoCapitalize="words"
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={name => setData({ ...data, name })}
            onSubmitEditing={() => {
              emailInputRef.current?.focus();
            }}
          />
          <Input
            ref={emailInputRef}
            pack="feather"
            icon="mail"
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={email => setData({ ...data, email })}
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />
          <Input
            ref={passwordInputRef}
            pack="feather"
            icon="lock"
            placeholder="Senha"
            secureTextEntry
            textContentType="newPassword"
            returnKeyType="send"
            onChangeText={password => setData({ ...data, password })}
            onSubmitEditing={handleAdvanceStep}
          />
          <Button onPress={handleAdvanceStep}>Próximo passo</Button>
        </Form>
      </Container>
    </DismissKeyboard>
  );
};

export default SignUp;
