import React, { useState, useCallback, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Modal as ReactModal,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Picker from 'react-native-picker-select';
import Device from 'react-native-device-detection';
import axios from 'axios';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

import { User } from '../../../hooks/team';

import {
  Background,
  ModalContainer,
  Container,
  Title,
  AvatarContainer,
  Avatar,
  Change,
  Input,
  MaskedInput,
  SelectContainer,
  Linear,
  Buttons,
  Cancel,
  Submit,
} from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface EditData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  city: string;
  uf: string;
  address: string;
}

interface EditProfileModalProps {
  user: User;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<EditProfileModalProps> = ({
  user,
  isOpen,
  setModalIsOpen,
}) => {
  const { updateUser } = useAuth();

  const [image, setImage] = useState('');
  const [editData, setEditData] = useState<EditData>({} as EditData);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const handleCancelModalEdit = useCallback(() => {
    setModalIsOpen(false);
    setEditData({} as EditData);
  }, [setModalIsOpen]);

  const handleSubmitModalEdit = useCallback(async () => {
    const response = await api.put('users', editData);

    if (image) {
      const data = new FormData();

      data.append('file', {
        type: 'image/jpeg',
        name: `${user.email}.jpg`,
        uri: image,
      });

      api.patch('users/avatar', data).then(apiResponse => {
        updateUser(apiResponse.data);
      });
    } else {
      updateUser(response.data);
    }

    setModalIsOpen(false);
    setEditData({} as EditData);
  }, [setModalIsOpen, editData, updateUser, user, image]);

  const handleSelectUf = useCallback(
    async (uf: string) => {
      setEditData({ ...editData, uf });

      const response = await axios.get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
      );

      const cityNames = response.data.map(city => city.nome);

      setCities(cityNames);
    },
    [editData],
  );

  const handlePickImage = useCallback(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert(
          'Precisamos da permissão de acesso de fotos para que essa ação funcione corretamente.',
        );
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });

        if (!result.cancelled) {
          setImage(result.uri);
        }
      }
    }
  }, []);

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
    <ReactModal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={() => setModalIsOpen(false)}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ModalContainer>
          <Container showsVerticalScrollIndicator={false}>
            <Title>Editar Perfil</Title>
            <AvatarContainer onPress={handlePickImage} activeOpacity={0.8}>
              <Avatar
                source={{
                  uri: image || user.avatar_url,
                }}
              />
              <Change>
                <Linear
                  colors={['#EB3349', '#F45C43']}
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                >
                  <FontAwesome name="exchange" size={20} color="#fff" />
                </Linear>
              </Change>
            </AvatarContainer>
            <Input
              autoCapitalize="words"
              pack="ant"
              icon="user"
              fontSize={16}
              onChangeText={name => setEditData({ ...editData, name })}
              value={editData.name ? editData.name : user.name}
            />
            <Input
              keyboardType="email-address"
              pack="feather"
              icon="mail"
              fontSize={16}
              onChangeText={email => setEditData({ ...editData, email })}
              value={editData.email ? editData.email : user.email}
            />
            <MaskedInput
              type="cel-phone"
              pack="feather"
              icon="phone"
              fontSize={16}
              onChangeText={(text, phone) => {
                phone && setEditData({ ...editData, phone });
              }}
              value={editData.phone ? editData.phone : user.phone}
            />
            <MaskedInput
              type="cpf"
              pack="font"
              icon="address-card"
              fontSize={16}
              onChangeText={(text, cpf) => {
                cpf && setEditData({ ...editData, cpf });
              }}
              value={editData.cpf ? editData.cpf : user.cpf}
            />
            <Input
              keyboardType="numeric"
              pack="font"
              icon="address-card"
              fontSize={16}
              onChangeText={rg => setEditData({ ...editData, rg })}
              value={editData.rg ? editData.rg : user.rg}
            />
            <SelectContainer icon="feather">
              <Picker
                disabled={!ufs[0]}
                style={{
                  placeholder: {
                    color: '#000',
                  },
                  inputAndroid: {
                    width: Device.width - 150,
                    fontFamily: 'Ubuntu_500Medium',
                    fontSize: 16,
                    color: '#000',
                  },
                  inputIOS: {
                    width: Device.width - 150,
                    fontFamily: 'Ubuntu_500Medium',
                    fontSize: 16,
                    color: '#000',
                    marginTop: 10,
                  },
                }}
                placeholder={{ label: 'Estado' }}
                useNativeAndroidPickerStyle={false}
                Icon={() => (
                  <Feather
                    name="chevron-down"
                    size={20}
                    color="#000"
                    style={{ marginTop: Platform.OS === 'android' ? 4.5 : 10 }}
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
                    color: '#000',
                  },
                  inputAndroid: {
                    width: Device.width - 150,
                    fontFamily: 'Ubuntu_500Medium',
                    fontSize: 16,
                    color: '#000',
                  },
                  inputIOS: {
                    width: Device.width - 150,
                    fontFamily: 'Ubuntu_500Medium',
                    fontSize: 16,
                    color: '#000',
                    marginTop: 10,
                  },
                }}
                placeholder={{ label: 'Cidade' }}
                useNativeAndroidPickerStyle={false}
                Icon={() => (
                  <Feather
                    name="chevron-down"
                    size={20}
                    color="#000"
                    style={{ marginTop: Platform.OS === 'android' ? 4.5 : 10 }}
                  />
                )}
                items={cities.map(city => ({ label: city, value: city }))}
                onValueChange={city => setEditData({ ...editData, city })}
              />
            </SelectContainer>
            <Input
              pack="feather"
              icon="home"
              fontSize={16}
              onChangeText={address => setEditData({ ...editData, address })}
              value={editData.address ? editData.address : user.address}
            />
          </Container>
          <Buttons>
            <Cancel onPress={handleCancelModalEdit}>
              <Feather name="x" size={50} color="#EB3349" />
            </Cancel>
            <Submit onPress={handleSubmitModalEdit}>
              <Feather name="check" size={45} color="#fff" />
            </Submit>
          </Buttons>
        </ModalContainer>
      </KeyboardAvoidingView>
    </ReactModal>
  );
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  isOpen,
  setModalIsOpen,
}) => {
  return (
    <>
      <ReactModal
        statusBarTranslucent
        animationType="fade"
        transparent
        visible={isOpen}
      >
        <Background />
        {Platform.OS === 'ios' && (
          <Modal user={user} isOpen={isOpen} setModalIsOpen={setModalIsOpen} />
        )}
      </ReactModal>
      {Platform.OS === 'android' && (
        <Modal user={user} isOpen={isOpen} setModalIsOpen={setModalIsOpen} />
      )}
    </>
  );
};

export default EditProfileModal;
