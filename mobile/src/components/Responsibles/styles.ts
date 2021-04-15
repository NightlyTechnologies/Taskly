import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  margin: 25px 0;
  height: 380px;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 24px;
  color: #252525;
  margin-bottom: 20px;
`;

const SwipeButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 3;
  top: 175px;
`;

export const LeftSwipeButton = styled(SwipeButton)`
  left: -15px;
`;

export const RightSwipeButton = styled(SwipeButton)`
  right: -15px;
`;
