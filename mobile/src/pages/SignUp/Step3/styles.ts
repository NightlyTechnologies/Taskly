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
  padding: 1% 15px 23%;
  color: #fafaf9;

  ${Device.width >= 390 &&
  css`
    padding: 5% 15px 25%;
  `}

  ${Platform.OS === 'ios' &&
  css`
    padding: 1% 15px 23%;
  `}
`;

export const Wave = styled.Image``;

export const Avatar = styled.TouchableOpacity`
  width: 220px;
  height: 220px;
  border-radius: 110px;
  background-color: #ffffff;
  margin: -90px 20px 56px;
  align-self: center;
  align-items: center;
  justify-content: center;
  position: relative;

  ${Device.width <= 390 &&
  css`
    margin: -90px 0 20px;
    width: 150px;
    height: 150px;
  `}

  ${Platform.OS === 'ios' &&
  css`
    width: 180px;
    height: 180px;
    margin: -110px 20px 35px;
  `}
`;

export const Plus = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #ed3f47;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  bottom: 0;

  ${Device.width <= 390 &&
  css`
    width: 50px;
    height: 50px;
    right: 2px;
    bottom: -5px;
  `}

  ${Platform.OS === 'ios' &&
  css`
    width: 55px;
    height: 55px;
    right: 2px;
    bottom: -5px;
  `}
`;

export const Form = styled.View`
  padding: 0 15px 20px;

  ${Device.width <= 390 &&
  css`
    padding: 0 15px 10px;
  `}
`;

export const AvatarImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 110px;
`;

export const Button = styled(NextStepButton)`
  ${Device.width <= 390 &&
  css`
    margin-top: 5px;
  `}
`;
