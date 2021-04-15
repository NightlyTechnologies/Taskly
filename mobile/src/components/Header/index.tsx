import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Container, BackArrow, Title, Divider } from './styles';

interface HeaderProps {
  haveBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ children, haveBackArrow }) => {
  const { goBack } = useNavigation();

  return (
    <Container>
      {haveBackArrow && (
        <BackArrow onPress={() => goBack()}>
          <Feather name="chevron-left" color="#ED3F47" size={30} />
        </BackArrow>
      )}
      <Title>{children}</Title>
      <Divider />
    </Container>
  );
};

export default Header;
