import styled, { css } from 'styled-components/native';
import Device from 'react-native-device-detection';

interface InputProps {
  fontSize: number | undefined;
}

export const Container = styled.View`
  border: 2px solid #777777;
  border-radius: 10px;
  width: 100%;
  height: 60px;
  margin: 4px 0 4px 0;
  padding-right: 20px;
  align-items: center;
  flex-direction: row;

  ${Device.width >= 390 &&
  css`
    height: 68px;
  `}
`;

export const TextInputArea = styled.TextInput<InputProps>`
  font-size: 18px;
  flex: 1;
  font-family: 'Ubuntu_500Medium';
  color: #000;

  ${props =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize}px;
    `}
`;
