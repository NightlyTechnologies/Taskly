import styled, { css } from 'styled-components/native';

interface EditButtonProps {
  type?: 'responsibles' | 'vtn' | 'tasks';
}

export const Container = styled.TouchableOpacity<EditButtonProps>`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  z-index: 4;
  position: absolute;
  top: 6%;
  align-self: center;
  elevation: 9;
  overflow: hidden;

  ${props =>
    props.type === 'responsibles' &&
    css`
      top: 35%;
    `}

  ${props =>
    props.type === 'vtn' &&
    css`
      top: 40%;
    `}

  ${props =>
    props.type === 'tasks' &&
    css`
      top: 83%;
    `}
`;

export const EditText = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 22px;
  color: #fff;
  margin-top: 5px;
`;

export const DetailText = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 14px;
  color: #fff;
  text-align: center;
`;
