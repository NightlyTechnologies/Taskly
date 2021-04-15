import React, { useCallback, useState, useEffect, useRef } from 'react';
import { TextInput, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Picker from 'react-native-picker-select';
import Device from 'react-native-device-detection';
import axios from 'axios';
import { useSignUp } from '../../../hooks/signup';

import SelectContainer from '../../../components/SelectContainer';
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
  Button,
} from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

export interface Step2FormData {
  uf: string;
  city: string;
  address: string;
}

const SignUp: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const { submitStep2 } = useSignUp();

  const addressInputRef = useRef<TextInput>(null);

  const [data, setData] = useState<Step2FormData>({} as Step2FormData);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const handleAdvanceStep = useCallback(() => {
    submitStep2(data);
    navigate('Step3');
  }, [navigate, submitStep2, data]);

  const handleSelectUf = useCallback(
    async (uf: string) => {
      setData({ ...data, uf });

      const response = await axios.get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
      );

      const cityNames = response.data.map(city => city.nome);

      setCities(cityNames);
    },
    [data],
  );

  useEffect(() => {
    async function loadUfs(): Promise<void> {
      const response = await axios.get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );

      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    }

    loadUfs();
  }, []);

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
          <Title>Agora, seu{'\n'}endereço:</Title>
          <Wave source={require('../../../assets/wave.png')} />
        </LinearGradient>
        <Content>
          <Description>
            Aqui você deve colocar seu <Bold>Estado</Bold>, <Bold>Cidade</Bold>{' '}
            e <Bold>Endereço</Bold>.
          </Description>
          <Description>
            Conte-nos onde você vive! Esses dados serão{' '}
            <Bold>muito importantes</Bold> para futuras comunicações.
          </Description>
        </Content>
        <Form>
          <SelectContainer icon="feather">
            <Picker
              disabled={!ufs[0]}
              style={{
                placeholder: {
                  color: '#777',
                },
                inputAndroid: {
                  width: Device.width - 110,
                  fontFamily: 'Ubuntu_500Medium',
                  fontSize: 18,
                  color: '#000',
                },
                inputIOS: {
                  width: Device.width - 110,
                  fontFamily: 'Ubuntu_500Medium',
                  fontSize: 18,
                  color: '#000',
                  marginTop: 21,
                },
              }}
              placeholder={{ label: 'Estado' }}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <Feather
                  name="chevron-down"
                  size={25}
                  color="#777"
                  style={{ marginTop: Platform.OS === 'android' ? 2 : 21 }}
                />
              )}
              items={ufs.map(uf => ({ label: uf, value: uf }))}
              onValueChange={uf => handleSelectUf(uf)}
            />
          </SelectContainer>
          <SelectContainer icon="material">
            <Picker
              disabled={!cities[0]}
              style={{
                placeholder: {
                  color: '#777',
                },
                inputAndroid: {
                  width: Device.width - 110,
                  fontFamily: 'Ubuntu_500Medium',
                  fontSize: 18,
                  color: '#000',
                },
                inputIOS: {
                  width: Device.width - 110,
                  fontFamily: 'Ubuntu_500Medium',
                  fontSize: 18,
                  color: '#000',
                  marginTop: 21,
                },
              }}
              placeholder={{ label: 'Cidade' }}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <Feather
                  name="chevron-down"
                  size={25}
                  color="#777"
                  style={{ marginTop: Platform.OS === 'android' ? 2 : 21 }}
                />
              )}
              items={cities.map(city => ({ label: city, value: city }))}
              onValueChange={city => {
                setData({ ...data, city });
                city && addressInputRef.current?.focus();
              }}
            />
          </SelectContainer>
          <Input
            ref={addressInputRef}
            pack="feather"
            icon="home"
            placeholder="Endereço"
            autoCapitalize="words"
            returnKeyType="send"
            onChangeText={address => setData({ ...data, address })}
            onSubmitEditing={handleAdvanceStep}
          />
          <Button onPress={handleAdvanceStep}>Próximo passo</Button>
        </Form>
      </Container>
    </DismissKeyboard>
  );
};

export default SignUp;
