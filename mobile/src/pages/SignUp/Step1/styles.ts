import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import Device from 'react-native-device-detection';

import NextStepButton from '../../../components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: #fafaf9;
  justify-content: flex-end;
`;

export const IconContainer = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 38px;
  padding: 1% 15px 0;
  color: #fafaf9;
  ${Device.width >= 390 &&
  css`
    padding: 5% 15px 10%;
  `}
  ${Platform.OS === 'ios' &&
  css`
    padding: 1% 15px 0;
  `}
`;

export const Content = styled.View`
  padding: 15px;
  ${Device.width >= 390 &&
  css`
    padding: 30px 15px;
  `}
`;

export const Wave = styled.Image``;

export const Description = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  text-align: justify;
  margin-bottom: 5px;
  ${Device.width >= 390 &&
  css`
    font-size: 18px;
    margin-bottom: 20px;
  `}
  ${Platform.OS === 'ios' &&
  css`
    margin-bottom: 3px;
  `}
`;

export const Bold = styled.Text`
  font-family: 'Ubuntu_700Bold';
  color: #f45c43;
`;

export const LoginButton = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
  color: #f45c43;
  ${Device.width >= 390 &&
  css`
    font-size: 18px;
    margin-bottom: 20px;
  `}
  ${Platform.OS === 'ios' &&
  css`
    margin-bottom: 15px;
  `}
`;

export const Form = styled.View`
  padding: 0 15px 20px;
  ${Device.width <= 390 &&
  css`
    padding: 0 15px 10px;
  `}
`;

export const Button = styled(NextStepButton)`
  ${Device.width <= 390 &&
  css`
    margin-top: 5px;
  `}
`;
