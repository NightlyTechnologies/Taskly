import styled, { css } from 'styled-components/native';

interface VtnCardProps {
  editMode: boolean;
}

export const Container = styled.View<VtnCardProps>`
  background: #fff;
  width: 100%;
  border-radius: 10px;
  padding: 23px;
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
`;

export const Key = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: #252525;
`;

export const Value = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Currency = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: #eb3349;
  position: absolute;
  right: 85px;
`;

export const Amount = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: #777;
`;

export const Divider = styled.View`
  background: #eb3349;
  height: 1px;
  width: 80%;
  align-self: center;
  margin: 6px 0;
`;
