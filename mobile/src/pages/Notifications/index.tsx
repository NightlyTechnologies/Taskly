import React from 'react';
import { View } from 'react-native';

import Header from '../../components/Header';

// import { Container } from './styles';

const Notifications: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fafaf9' }}>
      <Header>Notificações</Header>
    </View>
  );
};

export default Notifications;
