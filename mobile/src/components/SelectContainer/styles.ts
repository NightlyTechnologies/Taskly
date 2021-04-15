import styled, { css } from 'styled-components/native';
import Device from 'react-native-device-detection';

export const Container = styled.View`
  border: 2px solid #777777;
  border-radius: 10px;
  width: 100%;
  height: 60px;
  margin: 4px 0 4px 0;
  align-items: center;
  flex-direction: row;

  ${Device.width >= 390 &&
  css`
    height: 68px;
  `}
`;
