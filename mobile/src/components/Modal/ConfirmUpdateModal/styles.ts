import styled from 'styled-components/native';

export const Container = styled.View`
  width: 70%;
  border-radius: 10px;
  background: #fff;
  padding: 23px;
  align-items: center;
`;

export const Info = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 26px;
  color: #252525;
  text-align: center;
  margin-top: 15px;
`;

export const Background = styled.View`
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Buttons = styled.View`
  margin-top: 18px;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  background: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 35px;
  margin: 0 10px;
`;

export const Cancel = styled(Button)``;

export const Submit = styled(Button)`
  background: #21d353;
`;
