import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

interface InputProps {
  height?: number;
}

interface AvatarProps {
  isSelected: boolean;
}

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 23,
    alignItems: 'center',
  },
})`
  width: 93%;
  border-radius: 10px;
  background: #fff;
  max-height: 500px;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 26px;
  color: #eb3349;
  text-align: center;
`;

export const Label = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 20px;
  color: #252525;
  margin: 16px 0 12px;
  text-align: center;
`;

export const Input = styled.TextInput<InputProps>`
  width: 100%;
  border: 1px solid #777;
  border-radius: 10px;
  padding: 0 20px;
  font-family: 'Ubuntu_500Medium';
  font-size: 18px;
  color: #252525;

  ${props =>
    props.height &&
    css`
      height: ${props.height}px;
    `}

  ${props =>
    props.multiline &&
    css`
      padding: 20px;
    `}
`;

export const Deadline = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 15px 0 0;
`;

export const DeadlineText = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 18px;
  color: #252525;
`;

export const Picker = styled.TouchableOpacity`
  border: 2px solid #eb3349;
  border-radius: 15px;
  width: 150px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export const Value = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 16px;
  color: #eb3349;
`;

export const DatePickerContainer = styled.View`
  z-index: 5;
  width: 100px;
  display: none;
`;

export const Responsibles = styled.ScrollView``;

export const AvatarSelect = styled.TouchableWithoutFeedback``;

export const Avatar = styled.Image<AvatarProps>`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin: 0 7px;

  ${props =>
    props.isSelected &&
    css`
      border-width: 3px;
      border-color: #eb3349;
    `}
`;

export const ConfirmIcon = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #eb3349;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 6px;
`;

export const Cities = styled.View``;

export const SelectCity = styled.TouchableOpacity`
  width: 180px;
  height: 40px;
  border-radius: 50px;
`;

export const Linear = styled(LinearGradient)`
  flex: 1;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const SelectCityText = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 16px;
  color: #fff;
`;

export const City = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px;
`;

export const CityName = styled.Text`
  font-family: 'Ubuntu_500Medium';
  font-size: 18px;
  color: #252525;
`;

export const RemoveCity = styled.TouchableOpacity``;
