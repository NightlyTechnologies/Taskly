import styled, { css } from 'styled-components/native';
import Device from 'react-native-device-detection';
import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.View`
  width: 93%;
  border-radius: 10px;
  background: #fff;
  padding: 23px;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 24px;
  color: #eb3349;
  ${Device.width <= 390 &&
  css`
    font-size: 22px;
  `}
`;

export const YearContainer = styled.View`
  background: #eb3349;
  width: 100px;
  height: 35px;
  border-radius: 25px;
  margin-top: 8px;
  margin-bottom: 5px;
  align-self: center;

  ${Device.width <= 390 &&
  css`
    width: 80px;
    height: 28px;
  `}
`;

export const Year = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 24px;
  color: #fff;
  margin: auto;

  ${Device.width <= 390 &&
  css`
    font-size: 20px;
  `}
`;

export const Section = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Key = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: #252525;

  ${Device.width <= 390 &&
  css`
    font-size: 16px;
  `}
`;

export const InputContainer = styled.View`
  border: 1px solid #777;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 150px;

  ${Device.width <= 390 &&
  css`
    width: 135px;
  `}
`;

export const Input = styled(TextInputMask)`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #777;
`;

export const Currency = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: #eb3349;

  ${Device.width <= 390 &&
  css`
    font-size: 16px;
  `}
`;

export const Divider = styled.View`
  background: #eb3349;
  height: 1px;
  width: 80%;
  align-self: center;
  margin: 6px 0;
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
