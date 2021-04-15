import React, { useCallback, useRef, useState, ReactNode } from 'react';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Title,
  SubTitle,
  Logo,
  Linear,
  Form,
  Input,
  Button,
  LoginButton,
  Bold,
} from './styles';

interface DismissKeyboardProps {
  children: ReactNode;
}

const DismissKeyboard = ({ children }: DismissKeyboardProps) => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
  >
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

const Login = () => {
  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const passwordInputRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    try {
      await signIn({ email, password });
    } catch (err) {
      navigate('Error', {
        text: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        redirect: 'Login',
      });
    }
  }, [signIn, email, password, navigate]);

  return (
    <DismissKeyboard>
      <Container>
        <View>
          <Title>Taskly</Title>
          <SubTitle>sistema interno{'\n'}de tarefas</SubTitle>
        </View>
        <Logo resizeMode="contain" source={require('../../assets/logo.png')} />
        <View>
          <Image source={require('../../assets/login-wave.png')} />
          <Linear
            colors={['#EB3349', '#F45C43']}
            start={[0, 0.5]}
            end={[1, 0.5]}
          >
            <Form>
              <Input
                pack="feather"
                icon="mail"
                placeholder="Email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setEmail}
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
                onChangeText={setPassword}
                onSubmitEditing={handleLogin}
              />
              <Button white onPress={handleLogin}>
                Entrar
              </Button>
            </Form>
            <TouchableOpacity
              onPress={() => navigate('SignUp', { screen: 'Step1' })}
            >
              <LoginButton>
                Não possui conta? <Bold>Clique aqui!</Bold>
              </LoginButton>
            </TouchableOpacity>
          </Linear>
        </View>
      </Container>
    </DismissKeyboard>
  );
};

export default Login;
