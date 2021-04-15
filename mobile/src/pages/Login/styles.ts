import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import TextInput from '../../components/Input';
import SubmitButton from '../../components/Button';

const { width, height } = Dimensions.get('screen');

export const Container = styled.View`
  width: ${width}px;
  height: ${height}px;
  background-color: #fafaf9;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 56px;
  padding-top: 15%;
  color: #ed3f47;
  align-self: center;
  text-align: center;
`;

export const SubTitle = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: #ed3f47;
  align-self: center;
  text-align: center;
`;

export const Logo = styled.Image`
  align-self: center;
  height: ${height * 0.2}px;
  margin-right: -6%;

  ${width <= 390 &&
  css`
    height: ${height * 0.22}px;
    margin-bottom: -100px;
    z-index: 1;
  `}
`;

export const Linear = styled(LinearGradient)`
  padding-bottom: 20px;

  ${width <= 390 &&
  css`
    padding-bottom: 15px;
  `}
`;

export const Form = styled.View`
  padding: 0 15px 20px;

  ${width <= 390 &&
  css`
    padding: 0 15px 15px;
  `}
`;

export const Input = styled(TextInput)`
  background-color: #fff;
  border: 0;

  ${width < 380 &&
  css`
    height: 55px;
  `}
`;

export const Button = styled(SubmitButton)`
  ${width < 380 &&
  css`
    height: 60px;
    margin-top: 5px;
  `}
`;

export const LoginButton = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 18px;
  text-align: center;
  color: #fafaf9;
`;

export const Bold = styled.Text`
  font-family: 'Ubuntu_700Bold';
  color: #fafaf9;
`;
