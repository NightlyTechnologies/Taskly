import styled, { css } from 'styled-components/native';
import Device from 'react-native-device-detection';

interface TextProps {
  size?: number;
  red?: boolean;
}

export const RedContainer = styled.TouchableOpacity`
  border: 1px solid #eb3349;
  border-radius: 10px;
  width: 100%;
  height: 65px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;

  ${Device.width >= 390 &&
  css`
    height: 68px;
  `}
`;

export const WhiteContainer = styled.TouchableOpacity`
  border: 2px solid #fafaf9;
  border-radius: 10px;
  width: 100%;
  height: 65px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;

  ${Device.width >= 390 &&
  css`
    height: 68px;
  `}
`;

export const Container = styled.TouchableOpacity`
  border-radius: 10px;
  width: 100%;
  height: 65px;
  margin-top: 15px;

  ${Device.width >= 390 &&
  css`
    height: 68px;
  `}
`;

export const ButtonText = styled.Text<TextProps>`
  color: #fafaf9;
  font-family: 'Ubuntu_700Bold';
  font-size: 22px;

  ${props =>
    props.size &&
    css`
      font-size: ${props.size}px;
    `}

  ${props =>
    props.red &&
    css`
      color: #eb3349;
    `}
`;
