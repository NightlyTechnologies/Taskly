import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCity } from '../../../hooks/city';
import api from '../../../services/api';

import Header from '../../../components/Header';

import DismissKeyboard from '../../../utils/dismissKeyboard';
import agreementText from '../../../utils/agreementText';
import formatDate from '../../../utils/formatDate';
import formatValue from '../../../utils/formatValue';
import upperCaseFirstLetter from '../../../utils/upperCaseFirstLetter';
import shadow from '../../../utils/shadow';

import {
  Container,
  List,
  Search,
  Input,
  Icon,
  Card,
  Avatar,
  Infos,
  Title,
  Name,
  Uf,
  Section,
  Key,
  Value,
  Values,
  Type,
  TypeText,
} from './styles';

export interface City {
  id: string;
  avatar_url: string;
  name: string;
  uf: string;
  begin_validity: string;
  final_validity: string;
  contract_value: string;
  contract_type: 'online' | 'presential';
  agreement:
  | 'ok'
  | 'nonexistent'
  | 'denounced'
  | 'unable_worker'
  | 'unpublished';
}

const CityList: React.FC = () => {
  const { navigate } = useNavigation();
  const { cities, updateCities } = useCity();

  const [search, setSearch] = useState('');

  const renderSearch = () => (
    <Search>
      <Input
        placeholder="Pesquise um município"
        autoCapitalize="words"
        returnKeyType="search"
        placeholderTextColor="#777"
        onChangeText={text => setSearch(text.toLowerCase())}
      />
      <Icon name="search1" color="#ED3F47" size={20} />
    </Search>
  );

  const handleNavigateToDetails = useCallback(
    (city_id: string) => {
      navigate('CityDetailsRoutes', {
        screen: 'CityDetails',
        params: { city_id },
      });
    },
    [navigate],
  );

  const loadCities = useCallback(async () => {
    const response = await api.get<City[]>('cities');

    response.data && updateCities(response.data);
  }, [updateCities]);

  useEffect(() => {
    loadCities();
  }, [loadCities]);

  return (
    <DismissKeyboard>
      <Container>
        <Header>Municípios</Header>
        <List
          data={
            search ? cities.filter(city => city.name.includes(search)) : cities
          }
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          keyExtractor={city => city.id}
          ListHeaderComponent={renderSearch()}
          renderItem={({ item: city }) => (
            <Card
              onPress={() => handleNavigateToDetails(city.id)}
              activeOpacity={0.9}
              style={shadow}
            >
              <Avatar
                source={{
                  uri: city.avatar_url,
                }}
              />
              <Infos>
                <Title>
                  <Name>{upperCaseFirstLetter(city.name)}</Name>
                  <Uf>{city.uf}</Uf>
                </Title>
                <Section>
                  <Values>
                    <Key>Vigência: </Key>
                    <Value>
                      {formatDate(city.begin_validity, true)}-{' '}
                      {formatDate(city.final_validity, true)}
                    </Value>
                  </Values>
                </Section>
                <Section>
                  <Values>
                    <Key>Contrato: </Key>
                    <Value>{`R$${formatValue(city.contract_value)}`}</Value>
                  </Values>
                  <Type black={city.contract_type === 'online'}>
                    <TypeText>{city.contract_type}</TypeText>
                  </Type>
                </Section>
                <Section>
                  <Values>
                    <Key>Convênio: </Key>
                    <Value>{agreementText(city.agreement)}</Value>
                  </Values>
                </Section>
              </Infos>
            </Card>
          )}
        />
      </Container>
    </DismissKeyboard>
  );
};

export default CityList;
