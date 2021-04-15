import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import { addDays, formatISO } from 'date-fns';
import Select from 'react-native-picker-select';
import { Feather, Entypo } from '@expo/vector-icons';

import { UpdateData } from '../../hooks/activity';

import formatDate from '../../utils/formatDate';
import upperCaseFirstLetter from '../../utils/upperCaseFirstLetter';

import {
  Container,
  Title,
  Label,
  Input,
  Deadline,
  DeadlineText,
  Picker,
  Value,
  DatePickerContainer,
  Responsibles,
  AvatarSelect,
  Avatar,
  ConfirmIcon,
  Cities,
  SelectCity,
  SelectCityText,
  Linear,
  City,
  CityName,
  RemoveCity,
} from './styles';

interface ActivityEdit {
  type: 'update' | 'create' | 'subUpdate' | 'subCreate';
  updateData: UpdateData;
  setUpdateData: React.Dispatch<React.SetStateAction<UpdateData>>;
}

const ActivityEdit: React.FC<ActivityEdit> = ({
  type,
  updateData,
  setUpdateData,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const titleTypes = {
    update: 'Editar atividade',
    create: 'Adicionar atividade',
    subUpdate: 'Editar sub-atividade',
    subCreate: 'Adicionar sub-atividade',
  };

  const handleDateChange = useCallback(
    (event, date: Date | undefined) => {
      setShowDatePicker(false);

      if (date) {
        setUpdateData({
          ...updateData,
          deadline: formatISO(date, { representation: 'date' }),
        });
      }
    },
    [updateData, setUpdateData],
  );

  const selectUser = useCallback(
    user_id => {
      const responsibles = updateData.responsibles.map(user => {
        if (user.user.id === user_id) {
          return {
            user: user.user,
            isSelected: !user.isSelected,
          };
        }

        return user;
      });

      setUpdateData({ ...updateData, responsibles });
    },
    [updateData, setUpdateData],
  );

  const handleSelectCity = useCallback(
    city_id => {
      const cities = updateData.cities.map(city => {
        if (city.city.id === city_id) {
          return {
            city: city.city,
            isSelected: true,
          };
        }

        return city;
      });

      setUpdateData({ ...updateData, cities });
    },
    [updateData, setUpdateData],
  );

  const handleRemoveCity = useCallback(
    (city_id: string) => {
      const cities = updateData.cities.map(city => {
        if (city.city.id === city_id) {
          return {
            city: city.city,
            isSelected: false,
          };
        }

        return city;
      });

      setUpdateData({ ...updateData, cities });
    },
    [updateData, setUpdateData],
  );

  return (
    <Container showsVerticalScrollIndicator={false}>
      <Title>{titleTypes[type]}</Title>
      <Label>Título</Label>
      <Input
        onChangeText={title => setUpdateData({ ...updateData, title })}
        value={updateData.title}
        height={50}
      />
      <Label>Descrição</Label>
      <Input
        onChangeText={description => {
          setUpdateData({ ...updateData, description });
        }}
        value={updateData.description}
        multiline
      />
      <Deadline>
        <DeadlineText>Prazo:</DeadlineText>
        <Picker onPress={() => setShowDatePicker(true)}>
          <Value>
            {formatDate(updateData.deadline as string, false) ||
              formatDate(
                formatISO(new Date(Date.now()), {
                  representation: 'date',
                }),
                false,
              )}
          </Value>
        </Picker>
        {showDatePicker && (
          <DatePickerContainer>
            <DatePicker
              onChange={handleDateChange}
              value={addDays(new Date(Date.now()), 1)}
              style={{ width: '100%', height: 50 }}
              display="spinner"
              mode="date"
            />
          </DatePickerContainer>
        )}
      </Deadline>

      <Label>Responsáveis</Label>
      <Responsibles horizontal showsHorizontalScrollIndicator={false}>
        {updateData.responsibles.map(user => (
          <View key={user.user.id}>
            <AvatarSelect onPress={() => selectUser(user.user.id)}>
              <Avatar
                isSelected={user.isSelected}
                source={{
                  uri: user.user.avatar_url,
                }}
              />
            </AvatarSelect>
            {user.isSelected && (
              <ConfirmIcon>
                <Entypo name="check" size={13} color="#fff" />
              </ConfirmIcon>
            )}
          </View>
        ))}
      </Responsibles>
      {type !== 'subUpdate' && type !== 'subCreate' && (
        <>
          <Label>Municípios</Label>
          {updateData.cities.map(
            city =>
              city.isSelected === true && (
                <City key={city.city.id}>
                  <CityName>{upperCaseFirstLetter(city.city.name)}</CityName>
                  <RemoveCity onPress={() => handleRemoveCity(city.city.id)}>
                    <Feather name="x" size={25} color="#EB3349" />
                  </RemoveCity>
                </City>
              ),
          )}
          <Cities />
          <Select
            useNativeAndroidPickerStyle={false}
            items={updateData.cities.map(city => ({
              label: upperCaseFirstLetter(city.city.name),
              value: city.city.id,
              color: '#252525',
            }))}
            onValueChange={city => handleSelectCity(city)}
          >
            <SelectCity activeOpacity={0.8}>
              <Linear
                colors={['#EB3349', '#F45C43']}
                start={[0, 0.5]}
                end={[1, 0.5]}
              >
                <SelectCityText>Selecionar cidade</SelectCityText>
              </Linear>
            </SelectCity>
          </Select>
        </>
      )}
    </Container>
  );
};

export default ActivityEdit;
