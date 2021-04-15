import styled, { css } from 'styled-components/native';

interface VtnButtonProps {
  isSelected: boolean;
}

export const Container = styled.View`
  display: flex;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 24px;
  color: #252525;
  margin-bottom: 20px;
`;

export const Buttons = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
`;

export const Year = styled.TouchableOpacity<VtnButtonProps>`
  border: 1px solid #777;
  border-radius: 30px;
  width: 60px;
  margin: 0 3px;
  padding: 4px 0;
  align-items: center;
  justify-content: center;

  ${props =>
    props.isSelected &&
    css`
      border: 0;
      background: #eb3349;
    `}
`;

export const YearText = styled.Text<VtnButtonProps>`
  font-family: 'Ubuntu_500Medium';
  font-size: 12px;
  color: #777;

  ${props =>
    props.isSelected &&
    css`
      color: #fff;
    `}
`;
