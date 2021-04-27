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
      .filter(city => {
        if (city.isSelected) {
          return city.city;
        }

        return null;
      })
      .map(city => {
        return {
          id: city.city.id,
          name: upperCaseFirstLetter(city.city.name),
          uf: city.city.uf,
          avatar_url: city.city.avatar_url,
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
      sub_activities: [],
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
        sub_activities: [
          ...selectedActivity.sub_activities,
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

      const sub_activities = selectedActivity.sub_activities.map(
        subActivity => {
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
        },
      );

      const newActivity = { ...selectedActivity, sub_activities };

      setSelectedActivity(newActivity);

      const newMyActivities = myActivities.map(activity => {
        const matchSubActivity = activity.sub_activities.find(
          subActivity => subActivity.id === updateData.id,
        );

        return matchSubActivity ? newActivity : activity;
      });

      const newAllActivities = allActivities.map(activity => {
        const matchSubActivity = activity.sub_activities.find(
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
        const sub_activities = selectedActivity.sub_activities.filter(
          subActivity => subActivity.id !== subActivity_id,
        );

        const newActivity = { ...selectedActivity, sub_activities };

        setSelectedActivity(newActivity);

        const newMyActivities = myActivities.map(activity => {
          const matchSubActivity = activity.sub_activities.find(
            subActivity => subActivity.id === subActivity_id,
          );

          return matchSubActivity ? newActivity : activity;
        });

        const newAllActivities = allActivities.map(activity => {
          const matchSubActivity = activity.sub_activities.find(
            subActivity => subActivity.id === subActivity_id,
          );

          return matchSubActivity ? newActivity : activity;
        });

        setMyActivities(newMyActivities);
        setAllActivities(newAllActivities);
      } else {
        const sub_activities = selectedActivity.sub_activities.map(
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

        const newActivity = { ...selectedActivity, sub_activities };

        setSelectedActivity(newActivity);

        const newMyActivities = myActivities.map(activity => {
          const matchSubActivity = activity.sub_activities.find(
            subActivity => subActivity.id === subActivity_id,
          );

          return matchSubActivity ? newActivity : activity;
        });

        const newAllActivities = allActivities.map(activity => {
          const matchSubActivity = activity.sub_activities.find(
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
      const sub_activities = selectedActivity.sub_activities.filter(
        subActivity => subActivity.id !== subActivity_id,
      );

      const newActivity = { ...selectedActivity, sub_activities };

      setSelectedActivity(newActivity);

      const newMyActivities = myActivities.map(activity => {
        const matchSubActivity = activity.sub_activities.find(
          subActivity => subActivity.id === subActivity_id,
        );

        return matchSubActivity ? newActivity : activity;
      });

      const newAllActivities = allActivities.map(activity => {
        const matchSubActivity = activity.sub_activities.find(
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
    async function loadActivities() {
      const { data: myNewActivities } = await api.get<Activity[]>(
        'activities/my-activities',
      );
      const { data: newActivities } = await api.get<Activity[]>('activities');

      setMyActivities(myNewActivities);
      setAllActivities(newActivities);
    }

    loadActivities();
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
