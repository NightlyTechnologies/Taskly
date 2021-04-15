import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { RedContainer, WhiteContainer, Container, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  red?: boolean;
  white?: boolean;
  text?: number;
}

const Button: React.FC<ButtonProps> = ({
  red,
  white,
  text,
  children,
  ...rest
}) => {
  if (red) {
    return (
      <RedContainer activeOpacity={0.8} {...rest}>
        <ButtonText red size={text}>
          {children}
        </ButtonText>
      </RedContainer>
    );
  }

  if (white) {
    return (
      <WhiteContainer activeOpacity={0.8} {...rest}>
        <ButtonText size={text}>{children}</ButtonText>
      </WhiteContainer>
    );
  }

  return (
    <Container activeOpacity={0.8} {...rest}>
      <LinearGradient
        colors={['#EB3349', '#F45C43']}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={{
          flex: 1,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ButtonText size={text}>{children}</ButtonText>
      </LinearGradient>
    </Container>
  );
};

export default Button;
