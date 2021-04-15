import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';

import { Activity } from '../../pages/Activities/MyActivities';

interface ContainerProps {
  hasButton?: boolean;
}

interface ActivityProps {
  late: boolean;
}

interface AvatarProps {
  main?: boolean;
  sub?: boolean;
}

interface StatusBarProps {
  inProgress: boolean;
}

interface StatusProps {
  color?: string;
}

interface SubActivityProps {
  belowLevel?: number;
}

interface LigatureProps {
  more?: boolean;
}

export const Container = styled(FlatList as new () => FlatList<Activity>).attrs(
  (props: ContainerProps) => {
    return {
      contentContainerStyle: {
        paddingHorizontal: 15,
        paddingBottom: props.hasButton ? 115 : 15,
      },
    };
  },
) <ContainerProps>``;

export const ActivityCard = styled.TouchableOpacity<ActivityProps>`
  margin-top: 15px;
  background: #fff;
  border-radius: 10px;
  align-items: center;
  padding: 20px;
  z-index: 1;

  ${props =>
    props.late &&
    css`
      padding: 18px;
      border-width: 2px;
      border-color: #eb3349;
    `}
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 20px;
  color: #eb3349;
`;

export const Responsibles = styled.View`
  flex-direction: row;
  margin: 10px 0;
`;

export const Avatar = styled.Image<AvatarProps>`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: -15px;

  ${props =>
    props.main &&
    css`
      border-width: 1.5px;
      border-color: #eb3349;
    `}

  ${props =>
    props.sub &&
    css`
      width: 28px;
      height: 28px;
      border-radius: 14px;
      margin-right: -10px;
    `}
`;

export const Tail = styled.View`
  flex-direction: row-reverse;
  margin-right: 45px;
  margin-left: 15px;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Deadline = styled.View``;

export const DeadlineTitle = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #eb3349;
`;

export const DeadlineTime = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #777;
`;

export const Cities = styled.View`
  align-items: flex-end;
`;

export const City = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #777;
`;

export const Status = styled.View`
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

export const SubActivity = styled.View<SubActivityProps>`
  background: #fff;
  width: 85%;
  align-self: center;
  margin-top: 12px;
  border-radius: 10px;
  align-items: center;
  padding: 20px;
  margin-bottom: 8px;
  position: relative;

  ${props =>
    props.belowLevel === 1 &&
    css`
      width: 78%;
      margin-top: -38px;
    `}

  ${props =>
    props.belowLevel === 2 &&
    css`
      width: 68%;
      margin-top: -38px;
    `}
`;

export const SubContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SubTitle = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 16px;
  color: #eb3349;
  margin-bottom: 10px;
`;

export const SubResponsibles = styled.View`
  flex-direction: row-reverse;
  margin-left: 40px;
`;

export const SubStatus = styled.View<StatusProps>`
  height: 24px;
  border-radius: 12px;
  background: #777;
  padding: 0 22px;
  justify-content: center;

  ${props =>
    props.color &&
    css`
      background: ${props.color};
    `}
`;

export const SubStatusText = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 13px;
  color: #fff;
`;

export const Ligature = styled.Image<LigatureProps>`
  width: 15px;
  height: 85px;
  position: absolute;
  bottom: 45px;
  left: -15px;

  ${props =>
    props.more &&
    css`
      width: 2px;
      height: 103.5px;
      bottom: 26px;
    `}
`;

export const MoreSubActivities = styled.Text`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  left: -22px;
  bottom: 6px;
  font-family: 'Ubuntu_500Medium';
  font-size: 13px;
  color: #777;
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
