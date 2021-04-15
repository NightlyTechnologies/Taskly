import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { Container } from './styles';

interface SelectContainerProps {
  icon: 'feather' | 'material';
  style?: StyleProp<ViewStyle>;
}

const SelectContainer: React.FC<SelectContainerProps> = ({
  icon,
  style,
  children,
}) => {
  return (
    <Container style={style}>
      {icon === 'feather' ? (
        <Feather
          name="map-pin"
          color="#ED3F47"
          size={20}
          style={{ marginRight: 15, marginLeft: 23 }}
        />
      ) : (
        <MaterialCommunityIcons
          name="city-variant-outline"
          color="#ED3F47"
          size={20}
          style={{ marginRight: 15, marginLeft: 23 }}
        />
      )}
      {children}
    </Container>
  );
};

export default SelectContainer;
