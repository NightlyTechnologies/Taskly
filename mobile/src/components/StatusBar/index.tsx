import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container } from './styles';

const StatusBar: React.FC = () => {
  const insets = useSafeAreaInsets();

  return <Container height={insets.top} />;
};

export default StatusBar;
