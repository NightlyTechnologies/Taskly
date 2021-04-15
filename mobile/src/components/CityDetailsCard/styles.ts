import styled, { css } from 'styled-components/native';
import Device from 'react-native-device-detection';

interface ContractTypesProps {
  type?: 'double' | 'extended';
}

interface ContractTypeProps {
  selected: boolean;
  extended?: boolean;
  color?: 'black' | 'red';
}

interface CardProps {
  editMode: boolean;
}

export const Container = styled.View<CardProps>`
  margin-top: -22px;
  background-color: #fff;
  border-radius: 10px;
  padding: 23px 23px;
  margin-bottom: 20px;
  align-items: center;
  ${props =>
    props.editMode &&
    css`
      opacity: 0.4;
    `};
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 22px;
  color: #eb3349;
  margin-bottom: 10px;
`;

export const Section = styled.View`
  margin-top: 20px;
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

export const Value = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #777;
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

export const Type = styled.View<ContractTypeProps>`
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
