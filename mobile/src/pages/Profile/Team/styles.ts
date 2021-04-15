import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { User } from '.';

export const Container = styled.View`
  flex: 1;
  background-color: #fafaf9;
`;

export const UserList = styled(FlatList as new () => FlatList<User>).attrs({
  contentContainerStyle: {
    paddingTop: 22,
    paddingHorizontal: 15,
    paddingBottom: 2,
  },
})``;

export const Card = styled.TouchableOpacity`
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 23px 0;
  align-items: center;
  margin-bottom: 20px;
`;

export const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-bottom: 7px;
`;

export const Name = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
`;
