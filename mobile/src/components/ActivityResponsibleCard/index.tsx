import React from 'react';

import shadow from '../../utils/shadow';

import { Container, Header, Linear, CardTitle, Avatar, Name } from './styles';

interface ActivityResponsibleCardProps {
  isRequester?: boolean;
  name: string;
  avatar_url: string;
  onPress?: () => void;
}

const ActivityResponsibleCard: React.FC<ActivityResponsibleCardProps> = ({
  isRequester,
  name,
  avatar_url,
  onPress,
}) => (
  <Container style={shadow} onPress={onPress} activeOpacity={0.8}>
    <Header>
      <Linear colors={['#EB3349', '#F45C43']} start={[0, 0.5]} end={[1, 0.5]}>
        <CardTitle>{isRequester ? 'Solicitante' : 'Responsável'}</CardTitle>
      </Linear>
    </Header>
    <Avatar source={{ uri: avatar_url }} />
    <Name>{name}</Name>
  </Container>
);

export default ActivityResponsibleCard;
