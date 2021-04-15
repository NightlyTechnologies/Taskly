import React, { createContext, useState, useCallback, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

import { Step1FormData } from '../pages/SignUp/Step1';
import { Step2FormData } from '../pages/SignUp/Step2';
import { Step3FormData } from '../pages/SignUp/Step3';

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  uf: string;
  city: string;
  address: string;
  cpf: string;
  rg: string;
}

interface SignUpContextData {
  submitStep1(data: Step1FormData): void;
  submitStep2(data: Step2FormData): void;
  submitStep3(data: Step3FormData): Promise<void>;
  user: User;
}

const SignUpContext = createContext<SignUpContextData>({} as SignUpContextData);

export const SignUpProvider: React.FC = ({ children }) => {
  const { navigate } = useNavigation();

  const [userData, setUserData] = useState<UserData>({} as UserData);

  const submitStep1 = useCallback(
    ({ name, email, password }: Step1FormData) => {
      setUserData({ ...userData, name, email, password });
    },
    [userData],
  );

  const submitStep2 = useCallback(
    ({ uf, city, address }: Step2FormData) => {
      setUserData({ ...userData, uf, city, address });
    },
    [userData],
  );

  const submitStep3 = useCallback(
    async ({ phone, cpf, rg }: Step3FormData) => {
      try {
        await api.post('users', {
          ...userData,
          phone,
          cpf,
          rg,
        });
      } catch (err) {
        setUserData({} as UserData);
        navigate('Error', {
          text: 'Ocorreu um erro ao realizar seu cadastro!',
          redirect: 'Step1',
        });
      }
    },
    [userData, navigate],
  );

  return (
    <SignUpContext.Provider
      value={{
        user: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        },
        submitStep1,
        submitStep2,
        submitStep3,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export function useSignUp(): SignUpContextData {
  const context = useContext(SignUpContext);

  if (!context) {
    throw new Error('useSignUp must be used within an SignUpProvider');
  }

  return context;
}
