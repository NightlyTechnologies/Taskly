import styled, { css } from 'styled-components/native';
import Device from 'react-native-device-detection';

interface StatusBarProps {
  inProgress: boolean;
}

interface ButtonProps {
  red?: boolean;
  green?: boolean;
}

interface ContainerProps {
  medium?: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 93%;
  border-radius: 10px;
  background: #fff;
  padding: 23px;
  align-items: center;

  ${props =>
    props.medium &&
    css`
      width: 70%;
    `}
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 26px;
  color: #252525;
  margin-bottom: 10px;
  text-align: center;

  ${Device.width <= 390 &&
  css`
    font-size: 25px;
  `}
`;

export const SubResponsible = styled.View`
  flex-direction: row-reverse;
  padding-left: 10px;
`;

export const SubAvatar = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-right: -10px;
`;

export const SubDeadline = styled.View`
  flex-direction: row;
  margin: 14px 0 20px;
`;

export const SubDeadlineText = styled.Text`
  color: #eb3349;
  font-size: 16px;
  font-family: 'Ubuntu_500Medium';
  margin-right: 15px;
`;

export const SubDeadlineDate = styled.Text`
  color: #777;
  font-size: 16px;
  font-family: 'Ubuntu_500Medium';
`;

export const Description = styled.Text`
  color: #252525;
  text-align: justify;
  font-size: 16px;
  font-family: 'Ubuntu_500Medium';
`;

export const Status = styled.View`
  margin-top: 10px;
  width: 100%;
  align-items: center;
`;

export const StatusName = styled.Text<StatusBarProps>`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #252525;
  margin-bottom: 10px;

  ${props =>
    props.inProgress &&
    css`
      color: #ffcd00;
    `}
`;

export const StatusBar = styled.View`
  width: 100%;
  height: 7px;
  background: #bfbfbf;
  border-radius: 3.5px;
`;

export const StatusBarProgress = styled.View<StatusBarProps>`
  width: 33%;
  height: 7px;
  background: #252525;
  border-radius: 3.5px;

  ${props =>
    props.inProgress &&
    css`
      width: 66%;
      background: #ffcd00;
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

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: 70px;
  height: 70px;
  background: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 35px;
  margin: 0 10px;

  ${props =>
    props.red &&
    css`
      background: #eb3349;
    `}

  ${props =>
    props.green &&
    css`
      background: #21d353;
    `}
`;

export const DeleteQuestion = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #252525;
  margin: 5px 0;
  text-align: center;
`;

export const SubName = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 20px;
  color: #eb3349;
  text-align: center;
`;

export const Info = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 26px;
  color: #252525;
  text-align: center;
  margin-top: 15px;
`;
