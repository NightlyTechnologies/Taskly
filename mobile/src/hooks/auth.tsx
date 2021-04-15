import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';
import { isAfter } from 'date-fns';
import api from '../services/api';

interface Token {
  exp: number;
  sub: string;
}

interface User {
  id: string;
  firstName: string;
  name: string;
  email: string;
  type: string;
  phone: string;
  cpf: string;
  rg: string;
  avatar_url: string;
  city: string;
  uf: string;
  address: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Taskly:token',
        '@Taskly:user',
      ]);

      if (token[1] && user[1]) {
        const { exp } = jwtDecode<Token>(token[1]);

        if (isAfter(new Date(Date.now()), new Date(exp * 1000))) {
          setLoading(false);
          return;
        }

        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('users/login', {
      email,
      password,
    });

    const { token, user }: AuthState = response.data;

    const { sub } = jwtDecode<Token>(token);

    const firstName = user.name.split(' ', 1);

    Object.assign(user, {
      firstName: firstName[0],
      id: sub,
    });

    await AsyncStorage.multiSet([
      ['@Taskly:token', token],
      ['@Taskly:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Taskly:token', '@Taskly:user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      const firstName = user.name.split(' ', 1);

      Object.assign(user, {
        firstName: firstName[0],
      });

      await AsyncStorage.setItem('@Taskly:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
