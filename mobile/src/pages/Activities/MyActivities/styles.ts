import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: #fafaf9;
`;

export const AddActivity = styled.TouchableOpacity`
  width: 78px;
  height: 78px;
  border-radius: 49px;
  position: absolute;
  bottom: 18px;
  right: 18px;
  z-index: 10;
`;

export const Linear = styled(LinearGradient)`
  flex: 1;
  border-radius: 49px;
  align-items: center;
  justify-content: center;
`;
