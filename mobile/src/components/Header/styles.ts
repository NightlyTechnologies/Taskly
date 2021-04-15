import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import Device from 'react-native-device-detection';

export const Container = styled.View`
  align-items: center;
  background-color: #fafaf9;
`;

export const BackArrow = styled.TouchableOpacity`
  position: absolute;
  left: 6%;
  top: 50%;

  ${Device.width <= 390 &&
  css`
    top: 40%;
  `}

  ${Platform.OS === 'ios' &&
  css`
    top: 20%;
  `}
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 32px;
  padding: 10% 20px 2%;
  color: #ed3f47;
  text-align: center;

  ${Device.width <= 390 &&
  css`
    padding: 8% 20px 2%;
    font-size: 28px;
  `}

  ${Platform.OS === 'ios' &&
  css`
    padding: 2% 20px 2%;
  `}
`;

export const Divider = styled.View`
  background-color: #777777;
  width: 300px;
  height: 1px;
`;
