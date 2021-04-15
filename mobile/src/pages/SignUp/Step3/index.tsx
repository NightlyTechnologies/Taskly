import React, { useRef, useCallback, useState } from 'react';
import { TextInput, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Device from 'react-native-device-detection';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useSignUp } from '../../../hooks/signup';

import MaskedInput from '../../../components/MaskedInput';
import Input from '../../../components/Input';

import DismissKeyboard from '../../../utils/dismissKeyboard';

import {
  Container,
  IconContainer,
  Wave,
  Plus,
  Form,
  Title,
  Avatar,
  AvatarImage,
  Button,
} from './styles';

export interface Step3FormData {
  phone: string;
  cpf: string;
  rg: string;
  image: string;
}

const SignUp: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const { submitStep3 } = useSignUp();

  const cpfInputRef = useRef<TextInput>(null);
  const rgInputRef = useRef<TextInput>(null);

  const [data, setData] = useState<Step3FormData>({} as Step3FormData);

  const handleAdvanceStep = useCallback(async () => {
    await submitStep3(data);

    navigate('Finish', { image: data.image });
  }, [submitStep3, data, navigate]);

  const handlePickImage = useCallback(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        navigate('Error', {
          text:
            'Precisamos da permissão de acesso de fotos para que essa ação funcione corretamente.',
          redirect: 'Step3',
        });
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });

        if (!result.cancelled) {
          setData({ ...data, image: result.uri });
        }
      }
    }
  }, [data, navigate]);

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
          <Title>Estamos no fim!{'\n'}Seus dados:</Title>
          <Wave source={require('../../../assets/wave.png')} />
        </LinearGradient>
        <Avatar
          onPress={handlePickImage}
          activeOpacity={0.8}
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.5,
            shadowRadius: 12.35,

            elevation: 19,
          }}
        >
          {data.image ? (
            <AvatarImage source={{ uri: data.image }} />
          ) : (
            <Feather
              name="camera"
              size={Device.width >= 390 ? 100 : 70}
              color="#ED3F47"
            />
          )}
          <Plus>
            <Feather
              name="plus"
              size={Device.width >= 390 ? 35 : 28}
              color="#ffffff"
            />
          </Plus>
        </Avatar>
        <Form>
          <MaskedInput
            pack="feather"
            icon="phone"
            type="cel-phone"
            placeholder="Telefone"
            keyboardType="numeric"
            returnKeyType="next"
            blurOnSubmit={false}
            value={data.phone}
            onChangeText={(text, phone) => phone && setData({ ...data, phone })}
            onSubmitEditing={() => cpfInputRef.current?.focus()}
          />
          <MaskedInput
            ref={cpfInputRef}
            pack="font"
            icon="address-card"
            type="cpf"
            placeholder="CPF"
            keyboardType="numeric"
            returnKeyType="next"
            blurOnSubmit={false}
            value={data.cpf}
            onChangeText={(text, cpf) => cpf && setData({ ...data, cpf })}
            onSubmitEditing={() => {
              rgInputRef.current?.focus();
            }}
          />
          <Input
            ref={rgInputRef}
            pack="font"
            icon="address-card"
            placeholder="RG"
            keyboardType="numeric"
            returnKeyType="send"
            onChangeText={rg => setData({ ...data, rg })}
            onSubmitEditing={handleAdvanceStep}
          />
          <Button onPress={handleAdvanceStep}>Concluir cadastro</Button>
        </Form>
      </Container>
    </DismissKeyboard>
  );
};

export default SignUp;
