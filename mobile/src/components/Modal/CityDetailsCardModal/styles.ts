import styled, { css } from 'styled-components/native';
import Device from 'react-native-device-detection';
import { TextInputMask } from 'react-native-masked-text';

interface ContractTypesProps {
  type?: 'double' | 'extended';
}

interface ContractTypeProps {
  selected: boolean;
  extended?: boolean;
  color?: 'black' | 'red';
}

export const Container = styled.View`
  width: 93%;
  border-radius: 10px;
  background: #fff;
  padding: 23px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 28px;
  color: #eb3349;

  ${Device.width <= 390 &&
  css`
    font-size: 25px;
  `}
`;

export const Section = styled.View`
  margin-top: 15px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Key = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 16px;
  color: #252525;
`;

export const Picker = styled.TouchableOpacity`
  border: 2px solid #eb3349;
  border-radius: 15px;
  width: 150px;
  height: 30px;
  align-items: center;
  justify-content: center;

  ${Device.width <= 390 &&
  css`
    width: 130px;
  `}
`;

export const Value = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #eb3349;
`;

export const DatePickerContainer = styled.View`
  z-index: 5;
  width: 100px;
`;

export const Input = styled(TextInputMask)`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #eb3349;
  border: 2px solid #eb3349;
  border-radius: 15px;
  width: 150px;
  height: 30px;
  text-align: center;

  ${Device.width <= 390 &&
  css`
    width: 130px;
  `}
`;

export const TypeSection = styled.View`
  margin-top: 20px;
  align-items: center;
  width: 100%;
`;

export const Types = styled.View<ContractTypesProps>`
  flex-direction: row;
  margin-top: 15px;
  justify-content: space-between;
  width: 100%;

  ${Device.width <= 390 &&
  css`
    width: 90%;
  `}

  ${props =>
    props.type === 'double' &&
    css`
      width: 70%;

      ${Device.width <= 390 &&
      css`
        width: 60%;
      `}
    `}

  ${props =>
    props.type === 'extended' &&
    css`
      width: 96%;
      margin-top: 10px;

      ${Device.width <= 390 &&
      css`
        width: 94%;
      `}
    `}
`;

export const Type = styled.TouchableOpacity<ContractTypeProps>`
  border: 1px solid #777;
  border-radius: 30px;
  width: 100px;
  padding: 4px 0;
  align-items: center;
  justify-content: center;

  ${Device.width <= 390 &&
  css`
    width: 80px;
  `}

  ${props =>
    props.selected &&
    css`
      border: 0;
      background: #21d353;
    `}

  ${props =>
    props.extended &&
    css`
      width: 150px;

      ${Device.width <= 390 &&
      css`
        width: 130px;
      `}
    `}

  ${props =>
    props.color === 'black' &&
    props.selected &&
    css`
      background: #252525;
    `}

  ${props =>
    props.color === 'red' &&
    props.selected &&
    css`
      background: #eb3349;
    `}
`;

export const TypeText = styled.Text<ContractTypeProps>`
  font-family: 'Ubuntu_500Medium';
  font-size: 12px;
  color: #777;

  ${Device.width <= 390 &&
  css`
    font-size: 10px;
  `}

  ${props =>
    props.selected &&
    css`
      color: #fff;
    `}
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
