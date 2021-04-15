import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import TextInput from '../../Input';
import TextMaskedInput from '../../MaskedInput';
import Select from '../../SelectContainer';

export const Background = styled.View`
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: 15,
    paddingHorizontal: 23,
    paddingBottom: 23,
  },
})`
  width: 93%;
  border-radius: 10px;
  background: #fff;
  max-height: 500px;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu_700Bold';
  font-size: 24px;
  color: #eb3349;
  align-self: center;
`;

export const AvatarContainer = styled.TouchableOpacity`
  margin: 20px;
  align-self: center;
`;

export const Avatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 94px;
`;
export const Change = styled.View`
  background: #fff;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const Linear = styled(LinearGradient)`
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

export const Input = styled(TextInput)`
  height: 40px;
  border: 1px solid #777;
`;

export const MaskedInput = styled(TextMaskedInput)`
  height: 40px;
  border: 1px solid #777;
`;

export const SelectContainer = styled(Select)`
  height: 40px;
  border: 1px solid #777;
`;

export const Buttons = styled.View`
  margin-top: 18px;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  background: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 35px;
  margin: 0 10px;
`;

export const Cancel = styled(Button)``;

export const Submit = styled(Button)`
  background: #21d353;
`;
