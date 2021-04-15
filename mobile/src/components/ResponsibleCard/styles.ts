import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import Device from 'react-native-device-detection';

interface TypeProps {
  selected: boolean;
  red?: boolean;
  green?: boolean;
}

interface SectionProps {
  feather?: boolean;
  editMode: boolean;
}

interface EditModeProps {
  editMode: boolean;
}

export const Card = styled.View<EditModeProps>`
  background: #fff;
  width: 100%;
  padding: 10px 23px 23px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 255px;
  display: flex;
  justify-content: center;

  ${props =>
    props.editMode &&
    css`
      opacity: 0.4;
    `}
`;

export const Header = styled.View`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

export const Linear = styled(LinearGradient)`
  align-items: center;
  justify-content: center;
  height: 45px;
`;

export const CardTitle = styled.Text<EditModeProps>`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: #fff;

  ${props =>
    props.editMode &&
    css`
      opacity: 0.4;
    `}
`;

export const Section = styled.View<SectionProps>`
  flex-direction: row;
  align-items: center;
  margin: 8px 0;

  ${props =>
    props.editMode &&
    css`
      opacity: 0.4;
    `}

  ${Device.width <= 390 &&
  css`
    margin-top: 5px;
  `}

  ${props =>
    props.feather &&
    css`
      margin-left: 1.5px;
    `}
`;

export const Info = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 14px;
  color: #252525;
  position: absolute;
  margin-left: 34px;

  ${Device.width <= 390 &&
  css`
    font-size: 12px;
  `}
`;

export const TypeSection = styled.View<EditModeProps>`
  margin-top: 8px;
  align-items: center;
  width: 100%;

  ${props =>
    props.editMode &&
    css`
      opacity: 0.4;
    `}

  ${Device.width <= 390 &&
  css`
    margin-top: 5px;
  `}
`;

export const Key = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 16px;
  color: #252525;
`;

export const Types = styled.View`
  flex-direction: row;
  margin-top: 15px;
  justify-content: space-between;
  width: 55%;

  ${Device.width <= 390 &&
  css`
    width: 62%;
  `}
`;

export const Type = styled.View<TypeProps>`
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

export const Qualification = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 11px;
  color: #eb3349;
  position: absolute;
  left: 115px;
`;

export const NotFound = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: #eb3349;
  text-align: center;
  margin: 10px 20px 0;
`;
