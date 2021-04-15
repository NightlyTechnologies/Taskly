import styled from 'styled-components/native';

interface StatusBarProps {
  height: number;
}

export const Container = styled.View<StatusBarProps>`
  background: #fafaf9;
  height: ${props => props.height + 5}px;
  position: absolute;
  width: 100%;
  align-self: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 5;
`;
