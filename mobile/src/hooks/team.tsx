import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import api from '../services/api';

export interface User {
  id: string;
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

interface TeamContextData {
  teammates: User[];
  getTeammate: (user_id: string) => User | undefined;
}

const TeamContext = createContext<TeamContextData>({} as TeamContextData);

export const TeamProvider: React.FC = ({ children }) => {
  const [teammates, setTeammates] = useState<User[]>([]);

  const getTeammate = useCallback(
    (user_id: string) => {
      return teammates.find(user => user.id === user_id);
    },
    [teammates],
  );

  useEffect(() => {
    async function loadUsers(): Promise<void> {
      const response = await api.get('users');

      setTeammates(response.data);
    }

    loadUsers();
  }, []);

  return (
    <TeamContext.Provider value={{ teammates, getTeammate }}>
      {children}
    </TeamContext.Provider>
  );
};

export function useTeam(): TeamContextData {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error('useTeam must be used within an TeamProvider');
  }

  return context;
}
