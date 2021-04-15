import styled, { css } from 'styled-components/native';
import Device from 'react-native-device-detection';

interface TypeProps {
  selected: boolean | undefined;
  red?: boolean;
  green?: boolean;
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
  margin-bottom: 10px;

  ${Device.width <= 390 &&
  css`
    font-size: 25px;
  `}
`;

export const Section = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
`;

export const Key = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: #252525;
`;

export const Types = styled.View`
  flex-direction: row;
  justify-content: space-between;

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
  margin-left: 10px;
  align-items: center;
  justify-content: center;

  ${Device.width <= 390 &&
  css`
    width: 55px;
  `}

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
