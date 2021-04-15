import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Device from 'react-native-device-detection';

import { City } from '.';

interface TypeProps {
  black: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: #fafaf9;
`;

export const List = styled(FlatList as new () => FlatList<City>).attrs({
  contentContainerStyle: {
    paddingHorizontal: 15,
  },
})``;

export const Search = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 22px 0;
  padding: 0 20px;
  height: 45px;
  border: 1px solid #ed3f47;
  border-radius: 10px;
  width: 94%;
  align-self: center;

  ${Device.width <= 390 &&
  css`
    margin: 15px 0;
  `}
`;

export const Input = styled.TextInput`
  flex: 1;
  text-align: center;
  font-family: 'Ubuntu_500Medium';
`;

export const Icon = styled(AntDesign)`
  position: absolute;
  right: 20px;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 23px 23px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 85px;
`;

export const Infos = styled.View`
  margin-left: 20px;
  flex: 1;
`;

export const Title = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.Text`
  font-family: 'Ubuntu_700Bold';
  color: #ed3f47;
  font-size: 18px;
`;

export const Uf = styled.Text`
  font-size: 18px;
  color: #777;
  font-family: 'Ubuntu_500Medium';
`;

export const Section = styled.View`
  margin-top: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${Device.width <= 390 &&
  css`
    margin-top: 10px;
  `}
`;

export const Key = styled.Text`
  font-family: 'Ubuntu_700Bold';

  ${Device.width <= 390 &&
  css`
    font-size: 12px;
  `}
`;

export const Value = styled.Text`
  font-family: 'Ubuntu_500Medium';
  color: #777;

  ${Device.width <= 390 &&
  css`
    font-size: 12px;
  `}
`;

export const Values = styled.View`
  flex-direction: row;
`;

export const Type = styled.View<TypeProps>`
  background: #21d353;
  border-radius: 30px;
  padding: 2px 8px;

  ${props =>
    props.black &&
    css`
      background: #252525;
    `}
`;

export const TypeText = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 12px;
  color: #fff;

  ${Device.width <= 390 &&
  css`
    font-size: 10px;
  `}
`;
