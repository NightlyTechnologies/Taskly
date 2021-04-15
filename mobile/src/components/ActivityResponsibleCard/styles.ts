import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled.TouchableOpacity`
  background: #fff;
  width: 200px;
  padding: 55px 23px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

export const Header = styled.View`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const Linear = styled(LinearGradient)`
  align-items: center;
  justify-content: center;
  height: 45px;
`;

export const CardTitle = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: #fff;
`;

export const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

export const Name = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 24px;
  color: #eb3349;
  margin-bottom: 10px;
  margin-top: 10px;
`;
