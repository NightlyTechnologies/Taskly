import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Gradient = styled(LinearGradient)`
  flex: 1;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

export const Confirmation = styled.View`
  align-items: center;
`;

export const Message = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 28px;
  padding: 10% 20px 0;
  color: #fafaf9;
  text-align: center;
`;

export const Bold = styled.Text`
  font-family: 'Ubuntu_700Bold';
`;
