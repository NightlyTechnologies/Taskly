import styled, { css } from 'styled-components/native';
import Device from 'react-native-device-detection';

interface TasksCardProps {
  editMode: boolean;
}

interface TypeProps {
  selected: boolean;
  red?: boolean;
  green?: boolean;
}

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 24px;
  color: #252525;
  margin: 20px 0;
  align-self: center;
`;

export const Container = styled.View<TasksCardProps>`
  background: #fff;
  width: 100%;
  border-radius: 10px;
  padding: 20px 23px 23px;
  margin-bottom: 25px;

  ${props =>
    props.editMode &&
    css`
      opacity: 0.4;
    `}
`;

export const Section = styled.View`
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
    width: 42%;
  `}
`;

export const Type = styled.View<TypeProps>`
  border: 1px solid #777;
  border-radius: 30px;
  width: 60px;
  padding: 4px 0;
  margin-left: 10px;
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

  ${Device.width <= 390 &&
  css`
    width: 50px;
    margin-right: 0px;
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
