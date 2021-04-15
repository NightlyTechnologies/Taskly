import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import Device from 'react-native-device-detection';
import { LinearGradient } from 'expo-linear-gradient';

interface ContentProps {
  editMode: boolean;
}

export const EditMode = styled.View`
  background: #fff;
  position: absolute;
  align-self: center;
  bottom: 20px;
  padding: 10px 2px;
  z-index: 1;
  border-radius: 200px;
`;

export const EditButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const EditModeButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin: 0 10px;
  align-items: center;
  justify-content: center;

  ${Device.width <= 390 &&
  css`
    width: 60px;
    height: 60px;
  `}
`;

export const Cancel = styled(EditModeButton)`
  background: #eb3349;
`;

export const Submit = styled(EditModeButton)`
  background: #21d353;
`;

export const Container = styled.ScrollView`
  background: #fafaf9;
`;

export const Header = styled(LinearGradient)`
  padding: 15% 40px 10%;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1000px;
  margin-top: -940px;

  ${Platform.OS === 'ios' &&
  css`
    margin-top: -965px;
  `}
`;

export const Infos = styled.View`
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 120px;
  height: 160px;
  margin: 20px 0;
`;

export const Name = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 28px;
  color: #fff;
`;

export const Uf = styled.Text`
  margin-top: 2px;
  font-family: 'Ubuntu_500Medium';
  font-size: 18px;
  color: #252525;
`;

export const Wave = styled.Image`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const Content = styled.View<ContentProps>`
  padding: 0 15px;

  ${props =>
    props.editMode &&
    css`
      padding: 0 15px 100px;

      ${Device.width <= 390 &&
      css`
        padding: 0 15px 90px;
      `}
    `}
`;
