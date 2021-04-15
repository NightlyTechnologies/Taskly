import styled from 'styled-components/native';

import Button from '../../../components/Button';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #fafaf9;
`;

export const Avatar = styled.Image`
  width: 188px;
  height: 188px;
  border-radius: 94px;
  margin: 8% 0 5%;
  align-self: center;
`;

export const Name = styled.Text`
  font-family: 'Ubuntu_700Bold';
  color: #ed3f47;
  text-align: center;
  font-size: 35px;
  margin-bottom: 10px;
`;

export const Data = styled.View`
  padding: 15px 35px 3px;
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const Info = styled.Text`
  position: absolute;
  left: 32px;
  font-family: 'Ubuntu_500Medium';
  color: #252525;
  font-size: 16px;
`;

export const History = styled(Button)`
  padding: 0 15px;
  margin-bottom: 20px;
`;
