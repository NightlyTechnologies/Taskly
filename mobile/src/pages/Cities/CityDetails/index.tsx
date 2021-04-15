import React, { useState, useEffect, useCallback } from 'react';
import { Animated, TouchableOpacity, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useCity } from '../../../hooks/city';
import api from '../../../services/api';

import CityDetailsCard from '../../../components/CityDetailsCard';
import Responsibles from '../../../components/Responsibles';
import TasksCard from '../../../components/TasksCard';
import Vtn from '../../../components/Vtn';

import { City } from '../CityList';

import upperCaseFirstLetter from '../../../utils/upperCaseFirstLetter';

import {
  EditMode,
  EditButtons,
  Cancel,
  Submit,
  Container,
  Header,
  Infos,
  Avatar,
  Name,
  Uf,
  Wave,
  Content,
} from './styles';

export interface Responsible {
  name: string;
  birth: string;
  qualification: string;
  email: string;
  phone: string;
  role: string;
  reelected: boolean;
}

export interface Vtn {
  year: number;
  good: string;
  regular: string;
  restricted: string;
  planted: string;
  natural: string;
  preservation: string;
}

export interface Tasks {
  audit1: boolean;
  audit2: boolean;
  audit3: boolean;
  audit4: boolean;
  audit5: boolean;
  cafirs: boolean;
  diffs: boolean;
}

export interface CityDetails extends City {
  mayor: Responsible;
  tax_responsible: Responsible;
  supervisor1: Responsible;
  supervisor2: Responsible;
  vtn1: Vtn;
  vtn2: Vtn;
  vtn3: Vtn;
  vtn4: Vtn;
  vtn5: Vtn;
  tasks: Tasks;
}

interface RouteParams {
  city_id: string;
}

const CityDetails: React.FC = () => {
  const { cancelEdit, submitEdit } = useCity();
  const route = useRoute();
  const { goBack } = useNavigation();

  const { city_id } = route.params as RouteParams;

  const [city, setCity] = useState<CityDetails>({} as CityDetails);
  const [editMode, setEditMode] = useState(false);
  const [editModePosition] = useState(new Animated.Value(-130));

  const editModeClosing = useCallback(() => {
    Animated.spring(editModePosition, {
      toValue: -130,
      useNativeDriver: false,
    }).start();
  }, [editModePosition]);

  const editModeOpenning = useCallback(() => {
    Animated.spring(editModePosition, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }, [editModePosition]);

  const handleToggleEditMode = useCallback(() => {
    if (editMode) {
      setEditMode(false);
      editModeClosing();
    } else {
      setEditMode(true);

      editModeOpenning();
    }
  }, [editMode, editModeOpenning, editModeClosing]);

  const handleCancelEdit = useCallback(() => {
    setEditMode(false);
    cancelEdit();

    editModeClosing();
  }, [editModeClosing, cancelEdit]);

  const handleSubmitEdit = useCallback(async () => {
    setEditMode(false);

    const updatedCity = await submitEdit(city_id);

    if (updatedCity) {
      const modifiedCity: CityDetails = {
        ...updatedCity,
        name: upperCaseFirstLetter(updatedCity.name),
      };

      setCity(modifiedCity);
    }

    editModeClosing();
  }, [editModeClosing, submitEdit, city_id]);

  useEffect(() => {
    async function loadCity(): Promise<void> {
      const response = await api.get<CityDetails>(`cities/${city_id}`);

      const newCity: CityDetails = {
        ...response.data,
        name: upperCaseFirstLetter(response.data.name),
      };

      setCity(newCity);
    }

    loadCity();
  }, [city_id]);

  return (
    <>
      <Animated.View
        style={
          Platform.OS === 'android'
            ? {
              position: 'absolute',
              bottom: editModePosition,
              left: 0,
              right: 0,
            }
            : {
              position: 'absolute',
              bottom: editModePosition,
              left: 0,
              right: 0,
              zIndex: 1,
            }
        }
      >
        <EditMode
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.3,

            elevation: 13,
          }}
        >
          <EditButtons>
            <Cancel onPress={handleCancelEdit}>
              <Feather name="x" size={30} color="#fff" />
            </Cancel>
            <Submit onPress={handleSubmitEdit}>
              <Feather name="arrow-right" size={30} color="#fff" />
            </Submit>
          </EditButtons>
        </EditMode>
      </Animated.View>
      <Container overScrollMode="never" showsVerticalScrollIndicator={false}>
        <Header colors={['#EB3349', '#F45C43']} start={[0, 0.5]} end={[1, 0.5]}>
          <TouchableOpacity onPress={() => goBack()}>
            <Feather name="chevron-left" color="#fff" size={30} />
          </TouchableOpacity>
          <Infos>
            <Avatar source={{ uri: city.avatar_url }} />
            <Name>{city.name}</Name>
            <Uf>{city.uf}</Uf>
          </Infos>
          <TouchableOpacity onPress={handleToggleEditMode}>
            <MaterialIcons name="edit" color="#fff" size={25} />
          </TouchableOpacity>
          <Wave source={require('../../../assets/citydetail-wave.png')} />
        </Header>
        <Content editMode={editMode}>
          <CityDetailsCard editMode={editMode} city={city} />
          <Responsibles editMode={editMode} city={city} />
          <Vtn editMode={editMode} city={city} />
          <TasksCard editMode={editMode} tasks={city.tasks} />
        </Content>
      </Container>
    </>
  );
};

export default CityDetails;
