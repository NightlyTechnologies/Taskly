import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SubActivityProps {
  late: boolean;
}

interface StatusBarProps {
  inProgress: boolean;
}

export const Container = styled.ScrollView`
  background: #fafaf9;
`;

export const Header = styled(LinearGradient)`
  padding: 15% 40px 10%;
  align-items: center;
  justify-content: space-between;
  padding-top: 1000px;
  margin-top: -940px;

  ${Platform.OS === 'ios' &&
  css`
    margin-top: -965px;
  `}
`;

export const Buttons = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Name = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 28px;
  color: #fff;
  margin: 5px 0;
`;

export const Deadline = styled.Text`
  margin-top: 2px;
  font-family: 'Ubuntu_500Medium';
  font-size: 18px;
  color: #252525;
  margin-bottom: 10px;
`;

export const Wave = styled.Image`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const Content = styled.View`
  margin-top: -35px;
  padding: 0 15px 15px;
`;

export const DetailsCard = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 23px 23px;
  align-items: center;
  margin: -22px 15px 0;
`;

export const CardTitle = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 22px;
  color: #eb3349;
  margin-bottom: 10px;
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

export const Responsibles = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingVertical: 23,
    paddingLeft: 15,
  },
})``;

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

export const SectionTitle = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 22px;
  color: #252525;
  margin: 36px 0 10px;
  align-self: center;
`;

export const City = styled.TouchableOpacity`
  width: 100%;
  background: #fff;
  flex-direction: row;
  margin: 5px 0;
  padding: 12px 20px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const CityInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CityAvatar = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;

export const CityName = styled.Text`
  color: #eb3349;
  font-size: 16px;
  font-family: 'Ubuntu_500Medium';
  margin-left: 15px;
`;

export const CityUf = styled.Text`
  color: #252525;
  font-size: 16px;
  font-family: 'Ubuntu_500Medium';
`;

export const SubCard = styled.TouchableOpacity<SubActivityProps>`
  background-color: #fff;
  border-radius: 10px;
  padding: 23px 23px;
  align-items: center;
  margin: 5px 0 15px;

  ${props =>
    props.late &&
    css`
      border-width: 2px;
      border-color: #eb3349;
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

export const AddSubActivityButton = styled.TouchableOpacity`
  width: 215px;
  height: 40px;
  align-self: center;
  margin-bottom: 5px;
  border-radius: 20px;
`;

export const ButtonGradient = styled(LinearGradient)`
  flex: 1;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const AddSubActivityButtonText = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 16px;
  color: #fff;
`;

export const Late = styled.View`
  background: #eb3349;
  border-radius: 50px;
  padding: 4px 10px;
  position: absolute;
  top: -13px;
  right: 10px;
`;

export const LateText = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 13px;
  color: #fff;
`;
