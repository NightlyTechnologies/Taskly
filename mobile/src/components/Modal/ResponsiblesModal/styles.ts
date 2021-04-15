import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import Device from 'react-native-device-detection';
import { TextInputMask } from 'react-native-masked-text';

interface TypeProps {
  selected: boolean;
  red?: boolean;
  green?: boolean;
}

export const Container = styled.View`
  width: 93%;
  border-radius: 10px;
  background: #fff;
  padding: 60px 23px 23px;
  align-items: center;
`;

export const Header = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

export const Linear = styled(LinearGradient)`
  height: 55px;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 24px;
  color: #fff;
  margin: auto;
`;

export const InputContainer = styled.View`
  border: 1px solid #777;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
  margin-top: 15px;
`;

export const Input = styled.TextInput`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #000;
  flex: 1;
  height: 40px;
  margin-left: 10px;
`;

export const MaskedInput = styled(TextInputMask)`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #000;
  flex: 1;
  height: 40px;
  margin-left: 10px;
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  margin-left: 5px;
  width: 100%;
`;

export const Keys = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Info = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 14px;
  color: #252525;
  margin-left: 5px;

  ${Device.width <= 390 &&
  css`
    font-size: 12px;
  `}
`;

export const TypeSection = styled.View`
  margin-top: 8px;
  align-items: center;
  width: 100%;

  ${Device.width <= 390 &&
  css`
    margin-top: 5px;
  `}
`;

export const Key = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 16px;
  color: #252525;
  margin-top: 10px;
`;

export const Types = styled.View`
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
  width: 40%;

  ${Device.width <= 390 &&
  css`
    width: 45%;
  `}
`;

export const Type = styled.TouchableOpacity<TypeProps>`
  border: 1px solid #777;
  border-radius: 30px;
  width: 60px;
  padding: 4px 0;
  align-items: center;
  justify-content: center;

  ${props =>
    props.selected &&
    props.green &&
    css`
      border: 0;
      background: #21d353;
    `}

  ${props =>
    props.red &&
    !props.selected &&
    css`
      border: 0;
      background: #eb3349;
    `}
`;

export const TypeText = styled.Text<TypeProps>`
  font-family: 'Ubuntu_500Medium';
  font-size: 12px;
  color: #777;

  ${props =>
    props.red &&
    !props.selected &&
    css`
      color: #fff;
    `}

  ${props =>
    props.selected &&
    props.green &&
    css`
      color: #fff;
    `}
`;

export const Picker = styled.TouchableOpacity`
  border: 2px solid #eb3349;
  border-radius: 15px;
  width: 130px;
  height: 30px;
  align-items: center;
  justify-content: center;
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
