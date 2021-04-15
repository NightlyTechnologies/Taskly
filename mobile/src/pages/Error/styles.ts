import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import RollbackButton from '../../components/Button';

export const Gradient = styled(LinearGradient)`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 28px;
  padding: 10% 20px 0;
  color: #fafaf9;
  text-align: center;
`;

export const Button = styled(RollbackButton)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
