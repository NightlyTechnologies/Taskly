import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { formatISO } from 'date-fns';
import api from '../services/api';

import {
  Activity,
  Responsible,
  City as ActivityCity,
  SubActivity,
} from '../pages/Activities/MyActivities';

import upperCaseFirstLetter from '../utils/upperCaseFirstLetter';

import { City } from '../pages/Cities/CityList';
import { User } from './team';

interface ActivityUsers {
  user: User;
  isSelected: boolean;
}

interface ActivityCities {
  city: City;
  isSelected: boolean;
}

export interface UpdateData {
  id?: string;
  title?: string;
  description?: string;
  requester: Responsible;
  responsibles: ActivityUsers[];
  cities: ActivityCities[];
  deadline: string;
  status: 'requested' | 'pending';
}

export interface UpdateSubData {
  id?: string;
  title?: string;
  description?: string;
  responsibles: ActivityUsers[];
  deadline: string;
  status: 'requested' | 'pending';
}

interface ActivityContextData {
  myActivities: Activity[];
  allActivities: Activity[];
  selectedActivity: Activity;
  selectActivity: (activity: Activity) => void;
  addActivity: (updateData: UpdateData) => Promise<void>;
  updateActivity: (updateData: UpdateData) => Promise<void>;
  updateActivityStatus: (
    activity_id: string,
    status: 'pending' | 'finished',
  ) => Promise<void>;
  deleteActivity: (activity_id: string) => Promise<void>;
  addSubActivity: (updateData: UpdateSubData) => Promise<void>;
  updateSubActivity: (updateData: UpdateSubData) => void;
  updateSubActivityStatus: (
    subActivity_id: string,
    status: 'pending' | 'finished',
  ) => void;
  deleteSubActivity: (subActivity_id: string) => void;
  userIsResponsible: (user_id: string) => boolean;
}

const ActivityContext = createContext<ActivityContextData>(
  {} as ActivityContextData,
);

export const ActivityProvider: React.FC = ({ children }) => {
  const [myActivities, setMyActivities] = useState<Activity[]>([]);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity>(
    {} as Activity,
  );

  const formatDate = (date: string) => {
    const splitedDate = date.split('-');

    return `${splitedDate[1]}/${splitedDate[2]}/${splitedDate[0]}`;
  };

  const selectActivity = useCallback((activity: Activity) => {
    setSelectedActivity(activity);
  }, []);

  const parseData = useCallback((updateData: UpdateData) => {
    const selectedResponsibles: Responsible[] = updateData.responsibles
      .filter(responsible => {
        if (responsible.isSelected) {
          return responsible.user;
        }

        return null;
      })
      .map(responsible => {
        return {
          id: responsible.user.id,
          name: responsible.user.name,
          avatar_url: responsible.user.avatar_url,
        };
      });

    const selectedCities: ActivityCity[] = updateData.cities
      .filter(responsible => {
        if (responsible.isSelected) {
          return responsible.city;
        }

        return null;
      })
      .map(responsible => {
        return {
          id: responsible.city.id,
          name: upperCaseFirstLetter(responsible.city.name),
          uf: responsible.city.uf,
          avatar: responsible.city.avatar_url,
        };
      });

    const date = updateData.deadline.split('-').map(num => Number(num));

    return {
      id: updateData.id || '',
      title: updateData.title || 'Atividade',
      description: updateData.description || 'Sem descrição.',
      requester: updateData.requester,
      responsibles: selectedResponsibles,
      cities: selectedCities,
      subActivities: [],
      deadline: formatISO(
        new Date(date[0], date[1] - 1, date[2], 0, 0, 0, 0),
      ).replace('-03:00', '.562Z'),
      status: updateData.status,
    } as Activity;
  }, []);

  const addActivity = useCallback(
    async (updateData: UpdateData) => {
      const newActivity = parseData(updateData);

      const response = await api.post<Activity>('activities', {
        title: newActivity.title,
        description: newActivity.description,
        responsibles: newActivity.responsibles.map(
          responsible => responsible.id,
        ),
        cities: newActivity.cities.map(city => city.id),
        deadline: formatDate(updateData.deadline),
      });

      setMyActivities([
        ...myActivities,
        { ...newActivity, id: response.data.id },
      ]);
      setAllActivities([
        ...allActivities,
        { ...newActivity, id: response.data.id },
      ]);
    },
    [parseData, myActivities, allActivities],
  );

  const updateActivity = useCallback(
    async (updateData: UpdateData) => {
      const updatedActivity = parseData(updateData);

      await api.post(`activities/${updateData.id}`, {
        title: updateData.title,
        description: updateData.description,
        status: updateData.status,
        cities: updatedActivity.cities.map(city => city.id),
        responsibles: updatedActivity.responsibles.map(
          responsible => responsible.id,
        ),
        deadline: formatDate(updateData.deadline),
      });

      const newMyActivities = myActivities.map(activity =>
        activity.id === updatedActivity.id ? updatedActivity : activity,
      );

      const newAllActivities = allActivities.map(activity =>
        activity.id === updatedActivity.id ? updatedActivity : activity,
      );

      setSelectedActivity(updatedActivity);
      setMyActivities(newMyActivities);
      setAllActivities(newAllActivities);
    },
    [parseData, myActivities, allActivities],
  );

  const updateActivityStatus = useCallback(
    async (activity_id: string, status: 'pending' | 'finished') => {
      await api.post(`activities/${activity_id}`, { status });

      if (status === 'finished') {
        const newMyActivities = myActivities.filter(
          activity => activity.id !== activity_id,
        );

        const newAllActivities = allActivities.filter(
          activity => activity.id !== activity_id,
        );

        setMyActivities(newMyActivities);
        setAllActivities(newAllActivities);
      } else {
        const newMyActivities = myActivities.map(activity => {
          if (activity_id === activity.id) {
            return {
              ...activity,
              status,
            };
          }

          return activity;
        });

        const newAllActivities = allActivities.map(activity => {
          if (activity_id === activity.id) {
            return {
              ...activity,
              status,
            };
          }

          return activity;
        });

        const updatedActivity = {
          ...selectedActivity,
          status,
        };

        setSelectedActivity(updatedActivity);
        setMyActivities(newMyActivities);
        setAllActivities(newAllActivities);
      }
    },
    [selectedActivity, myActivities, allActivities],
  );

  const deleteActivity = useCallback(
    async (activity_id: string) => {
      await api.delete(`activities/${activity_id}`);

      const newMyActivities = myActivities.filter(
        activity => activity.id !== activity_id,
      );

      const newAllActivities = allActivities.filter(
        activity => activity.id !== activity_id,
      );

      setMyActivities(newMyActivities);
      setAllActivities(newAllActivities);
    },
    [myActivities, allActivities],
  );

  const addSubActivity = useCallback(
    async (updateData: UpdateSubData) => {
      const selectedResponsibles: Responsible[] = updateData.responsibles
        .filter(responsible => {
          if (responsible.isSelected) {
            return responsible.user;
          }

          return null;
        })
        .map(responsible => {
          return {
            id: responsible.user.id,
            name: responsible.user.name,
            avatar_url: responsible.user.avatar_url,
          };
        });

      const date = updateData.deadline.split('-').map(num => Number(num));

      const newSubActivity = {
        id: updateData.id || '',
        title: updateData.title || 'Atividade',
        description: updateData.description || 'Sem descrição.',
        responsibles: selectedResponsibles,
        deadline: formatISO(
          new Date(date[0], date[1] - 1, date[2], 0, 0, 0, 0),
        ).replace('-03:00', '.562Z'),
        status: updateData.status,
      } as SubActivity;

      const response = await api.post<SubActivity>('sub_activities', {
        title: newSubActivity.title,
        description: newSubActivity.description,
        activity: selectedActivity.id,
        responsibles: selectedResponsibles.map(responsible => responsible.id),
        deadline: formatDate(updateData.deadline),
      });

      const newActivity: Activity = {
        ...selectedActivity,
        subActivities: [
          ...selectedActivity.subActivities,
          { ...newSubActivity, id: response.data.id },
        ],
      };

      setSelectedActivity(newActivity);

      const newMyActivities = myActivities.map(activity => {
        return activity.id === newActivity.id ? newActivity : activity;
      });

      const newAllActivities = allActivities.map(activity => {
        return activity.id === newActivity.id ? newActivity : activity;
      });

      setMyActivities(newMyActivities);
      setAllActivities(newAllActivities);
    },
    [myActivities, allActivities, selectedActivity],
  );

  const updateSubActivity = useCallback(
    (updateData: UpdateSubData) => {
      const selectedResponsibles: Responsible[] = updateData.responsibles
        .filter(responsible => {
          if (responsible.isSelected) {
            return responsible.user;
          }

          return null;
        })
        .map(responsible => {
          return {
            id: responsible.user.id,
            name: responsible.user.name,
            avatar_url: responsible.user.avatar_url,
          };
        });

      const date = updateData.deadline.split('-').map(num => Number(num));

      const subActivities = selectedActivity.subActivities.map(subActivity => {
        if (subActivity.id === updateData.id) {
          return {
            id: updateData.id || String(Math.random()),
            title: updateData.title || 'Atividade',
            description: updateData.description || 'Sem descrição.',
            responsibles: selectedResponsibles,
            deadline: formatISO(
              new Date(date[0], date[1] - 1, date[2], 0, 0, 0, 0),
            ).replace('-03:00', '.562Z'),
            status: updateData.status,
          } as SubActivity;
        }

        return subActivity;
      });

      const newActivity = { ...selectedActivity, subActivities };

      setSelectedActivity(newActivity);

      const newMyActivities = myActivities.map(activity => {
        const matchSubActivity = activity.subActivities.find(
          subActivity => subActivity.id === updateData.id,
        );

        return matchSubActivity ? newActivity : activity;
      });

      const newAllActivities = allActivities.map(activity => {
        const matchSubActivity = activity.subActivities.find(
          subActivity => subActivity.id === updateData.id,
        );

        return matchSubActivity ? newActivity : activity;
      });

      setMyActivities(newMyActivities);
      setAllActivities(newAllActivities);
    },
    [selectedActivity, myActivities, allActivities],
  );

  const updateSubActivityStatus = useCallback(
    (subActivity_id: string, status: 'pending' | 'finished') => {
      if (status === 'finished') {
        const subActivities = selectedActivity.subActivities.filter(
          subActivity => subActivity.id !== subActivity_id,
        );

        const newActivity = { ...selectedActivity, subActivities };

        setSelectedActivity(newActivity);

        const newMyActivities = myActivities.map(activity => {
          const matchSubActivity = activity.subActivities.find(
            subActivity => subActivity.id === subActivity_id,
          );

          return matchSubActivity ? newActivity : activity;
        });

        const newAllActivities = allActivities.map(activity => {
          const matchSubActivity = activity.subActivities.find(
            subActivity => subActivity.id === subActivity_id,
          );

          return matchSubActivity ? newActivity : activity;
        });

        setMyActivities(newMyActivities);
        setAllActivities(newAllActivities);
      } else {
        const subActivities = selectedActivity.subActivities.map(
          subActivity => {
            if (subActivity.id === subActivity_id) {
              return {
                ...subActivity,
                status,
              };
            }

            return subActivity;
          },
        );

        const newActivity = { ...selectedActivity, subActivities };

        setSelectedActivity(newActivity);

        const newMyActivities = myActivities.map(activity => {
          const matchSubActivity = activity.subActivities.find(
            subActivity => subActivity.id === subActivity_id,
          );

          return matchSubActivity ? newActivity : activity;
        });

        const newAllActivities = allActivities.map(activity => {
          const matchSubActivity = activity.subActivities.find(
            subActivity => subActivity.id === subActivity_id,
          );

          return matchSubActivity ? newActivity : activity;
        });

        setMyActivities(newMyActivities);
        setAllActivities(newAllActivities);
      }
    },
    [selectedActivity, myActivities, allActivities],
  );

  const deleteSubActivity = useCallback(
    (subActivity_id: string) => {
      const subActivities = selectedActivity.subActivities.filter(
        subActivity => subActivity.id !== subActivity_id,
      );

      const newActivity = { ...selectedActivity, subActivities };

      setSelectedActivity(newActivity);

      const newMyActivities = myActivities.map(activity => {
        const matchSubActivity = activity.subActivities.find(
          subActivity => subActivity.id === subActivity_id,
        );

        return matchSubActivity ? newActivity : activity;
      });

      const newAllActivities = allActivities.map(activity => {
        const matchSubActivity = activity.subActivities.find(
          subActivity => subActivity.id === subActivity_id,
        );

        return matchSubActivity ? newActivity : activity;
      });

      setMyActivities(newMyActivities);
      setAllActivities(newAllActivities);
    },
    [selectedActivity, myActivities, allActivities],
  );

  const userIsResponsible = useCallback(
    (user_id: string) => {
      return selectedActivity.responsibles.some(
        responsible => responsible.id === user_id,
      );
    },
    [selectedActivity],
  );

  useEffect(() => {
    const activitiesTest = [
      {
        id: 'eb4e49e0-2ab6-4884-9e49-a7ea221b2275',
        title: 'Importação de CAFIR',
        description:
          'Importar CAFIRs faltantes das cidades, conferindo a presença do...',
        requester: {
          id: 'f333e4fa-b024-4613-aade-73a1e689f02d',
          name: 'Luiz',
          avatar_url:
            'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
        },
        responsibles: [
          {
            id: 'a9f0a6c4-49c2-4fc7-8786-c888803421fb',
            name: 'Luiz',
            avatar_url:
              'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
          },
          {
            id: '3abc3adf-b694-4e4e-9af8-eaaaacb4707f',
            name: 'João',
            avatar_url:
              'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
          },
          {
            id: '386afb5f-6562-4ae8-82ee-f14e8afede3a',
            name: 'Nightly',
            avatar_url:
              'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
          },
        ],
        cities: [
          {
            id: 'bcc7067b-b924-4343-ace2-2b684c71394b',
            avatar:
              'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
            name: 'Coronel Domingo Soares',
            uf: 'PR',
          },
          {
            id: '2b3c3517-bd5b-4cab-b2a9-b6dcdf014df5',
            avatar:
              'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
            name: 'Ponta Grossa',
            uf: 'PR',
          },
          {
            id: '3bb08b07-2c82-4393-b9b9-da2cc1e6b251',
            avatar:
              'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
            name: 'Sengés',
            uf: 'PR',
          },
        ],
        subActivities: [
          {
            id: 'e2dc1382-4970-43e7-b6b4-0fb2582360fe',
            title: 'Conferir relatórios',
            responsibles: [
              {
                id: 'bb55f619-294f-4b48-bb23-c541795922cc',
                name: 'Luiz',
                avatar_url:
                  'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
              },
              {
                id: '3abc3adf-b694-4e4e-9af8-eaaaacb4707f',
                name: 'João',
                avatar_url:
                  'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
              },
              {
                id: '386afb5f-6562-4ae8-82ee-f14e8afede3a',
                name: 'Nightly',
                avatar_url:
                  'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
              },
            ],
            deadline: '2020-07-09T00:21:00.562Z',
            description: 'Conferir e comparar os relatórios das cidades.',
            status: 'pending',
          },
          {
            id: '420a115c-d28c-44dd-bb48-5d5d8b5ee90a',
            title: 'Gerar laudos',
            responsibles: [
              {
                id: 'bb55f619-294f-4b48-bb23-c541795922cc',
                name: 'Luiz',
                avatar_url:
                  'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
              },
              {
                id: '3abc3adf-b694-4e4e-9af8-eaaaacb4707f',
                name: 'João',
                avatar_url:
                  'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
              },
            ],
            deadline: '2021-07-18T00:21:00.562Z',
            description: 'Gerar laudos baseados nos relatórios anteriores.',
            status: 'requested',
          },
          {
            id: '833923a2-4229-40ef-9eb2-7655b99e9566',
            title: 'Fazer mapas',
            responsibles: [
              {
                id: 'bb55f619-294f-4b48-bb23-c541795922cc',
                name: 'Luiz',
                avatar_url:
                  'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
              },
            ],
            deadline: '2020-07-28T00:21:00.562Z',
            description: 'Desenhar mapas das propriedades de todas as cidades',
            status: 'requested',
          },
        ],
        deadline: '2020-08-09T00:21:00.562Z',
        status: 'pending',
      },
      {
        id: '4cfa5b5a-9b8c-4544-a995-1e78c5d73fc7',
        title: 'Registrar propriedades',
        description:
          'Importar CAFIRs faltantes das cidades, conferindo a presença do...',
        requester: {
          id: 'bb55f619-294f-4b48-bb23-c541795922cc',
          name: 'Luiz',
          avatar_url:
            'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
        },
        responsibles: [
          {
            id: 'bb55f619-294f-4b48-bb23-c541795922cc',
            name: 'Luiz',
            avatar_url:
              'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
          },
          {
            id: '3abc3adf-b694-4e4e-9af8-eaaaacb4707f',
            name: 'João',
            avatar_url:
              'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
          },
        ],
        cities: [
          {
            id: 'bcc7067b-b924-4343-ace2-2b684c71394b',
            avatar:
              'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
            name: 'Santa Tereza do Oeste',
            uf: 'PR',
          },
        ],
        subActivities: [
          {
            id: 'bcc7067b-b924-4343-ace2-2b684c71394b',
            title: 'Conferir relatórios',
            responsibles: [
              {
                id: 'bb55f619-294f-4b48-bb23-c541795922cc',
                name: 'Luiz',
                avatar_url:
                  'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
              },
              {
                id: '3abc3adf-b694-4e4e-9af8-eaaaacb4707f',
                name: 'João',
                avatar_url:
                  'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
              },
              {
                id: '386afb5f-6562-4ae8-82ee-f14e8afede3a',
                name: 'Nightly',
                avatar_url:
                  'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
              },
            ],
            deadline: '2020-07-09T00:21:00.562Z',
            description: 'Conferir e comparar os relatórios das cidades.',
            status: 'pending',
          },
          {
            id: '420a115c-d28c-44dd-bb48-5d5d8b5ee90a',
            title: 'Gerar laudos',
            responsibles: [
              {
                id: 'bb55f619-294f-4b48-bb23-c541795922cc',
                name: 'Luiz',
                avatar_url:
                  'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
              },
              {
                id: '3abc3adf-b694-4e4e-9af8-eaaaacb4707f',
                name: 'João',
                avatar_url:
                  'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
              },
            ],
            deadline: '2020-07-18T00:21:00.562Z',
            description: 'Gerar laudos baseados nos relatórios anteriores.',
            status: 'requested',
          },
        ],
        deadline: '2021-11-20T00:21:00.562Z',
        status: 'pending',
      },
      {
        id: '7fd1ced7-d654-4e35-8180-4446255a0355',
        title: 'Calcular VTN',
        description:
          'Importar CAFIRs faltantes das cidades, conferindo a presença do...',
        requester: {
          id: 'bb55f619-294f-4b48-bb23-c541795922cc',
          name: 'Luiz',
          avatar_url:
            'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
        },
        responsibles: [
          {
            id: 'bb55f619-294f-4b48-bb23-c541795922cc',
            name: 'Luiz',
            avatar_url:
              'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
          },
        ],
        cities: [
          {
            id: 'bcc7067b-b924-4343-ace2-2b684c71394b',
            avatar:
              'http://192.168.1.31:3333/files/5014ce532048d4e2d24e-Square.png',
            name: 'Dionísio Cerqueira',
            uf: 'PR',
          },
        ],
        subActivities: [],
        deadline: '2021-11-20T00:21:00.562Z',
        status: 'requested',
      },
    ];

    setMyActivities(activitiesTest);
    setAllActivities(activitiesTest);
  }, []);

  return (
    <ActivityContext.Provider
      value={{
        myActivities,
        allActivities,
        selectedActivity,
        selectActivity,
        addActivity,
        updateActivity,
        updateActivityStatus,
        deleteActivity,
        addSubActivity,
        updateSubActivity,
        updateSubActivityStatus,
        deleteSubActivity,
        userIsResponsible,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export function useActivity(): ActivityContextData {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }

  return context;
}
