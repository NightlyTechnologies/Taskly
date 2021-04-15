import React, { useState, useCallback } from 'react';
import { Animated } from 'react-native';
import Device from 'react-native-device-detection';
import { Feather } from '@expo/vector-icons';
import { useCity } from '../../hooks/city';

import EditButton from '../EditButton';
import ResponsibleCard from '../ResponsibleCard';

import { CityDetails, Responsible } from '../../pages/Cities/CityDetails';

import { Container, Title, LeftSwipeButton, RightSwipeButton } from './styles';

interface AnimationProps {
  transform: Animated.Value;
  positionX: Animated.Value;
  index: Animated.Value;
  order: number;
}

export type ResponsiblesType =
  | 'Prefeito'
  | 'Responsável Tributário'
  | 'Fiscal 1'
  | 'Fiscal 2';

interface ResponsiblesProps {
  city: CityDetails;
  editMode: boolean;
}

const Responsibles: React.FC<ResponsiblesProps> = ({ city, editMode }) => {
  const { dataWasModify } = useCity();

  const [position, setPosition] = useState(0);

  const [mayorTranformValue] = useState(new Animated.Value(1));
  const [mayorPositionValue] = useState(new Animated.Value(0));
  const [mayorZIndexValue] = useState(new Animated.Value(1));

  const [taxTranformValue] = useState(new Animated.Value(1));
  const [taxPositionValue] = useState(new Animated.Value(0));
  const [taxZIndexValue] = useState(new Animated.Value(0));

  const [supervisor1TranformValue] = useState(new Animated.Value(1));
  const [supervisor1PositionValue] = useState(new Animated.Value(0));
  const [supervisor1ZIndexValue] = useState(new Animated.Value(0));

  const [supervisor2TranformValue] = useState(new Animated.Value(1));
  const [supervisor2PositionValue] = useState(new Animated.Value(0));
  const [supervisor2ZIndexValue] = useState(new Animated.Value(0));

  const responsibleSelected = (responsible: number): ResponsiblesType => {
    switch (responsible) {
      case 0:
        return 'Prefeito';

      case 1:
        return 'Responsável Tributário';

      case 2:
        return 'Fiscal 1';

      default:
        return 'Fiscal 2';
    }
  };

  const responsibleData = (responsible: number): Responsible => {
    switch (responsible) {
      case 0:
        return city.mayor;

      case 1:
        return city.tax_responsible;

      case 2:
        return city.supervisor1;

      default:
        return city.supervisor2;
    }
  };

  const responsibleFinished = (responsible: number): boolean => {
    switch (responsible) {
      case 0:
        return dataWasModify.mayorWasModify;

      case 1:
        return dataWasModify.taxResponsibleWasModify;

      case 2:
        return dataWasModify.supervisor1WasModify;

      default:
        return dataWasModify.supervisor2WasModify;
    }
  };

  const handleSwipeRight = useCallback(() => {
    if (position < 3) {
      setPosition(position + 1);
    } else {
      setPosition(0);
    }
  }, [position]);

  const handleSwipeLeft = useCallback(() => {
    if (position > 0) {
      setPosition(position - 1);
    } else {
      setPosition(3);
    }
  }, [position]);

  const orderData = useCallback((order: number) => {
    switch (order) {
      case 1:
        return [Device.width * 0.115, 2];

      case 2:
        return [Device.width * 0.28, 1];

      case 3:
        return [Device.width * 0.115, 0];

      default:
        return [-Device.width * 0.048, 1];
    }
  }, []);

  const goToPosition = useCallback(
    ({ transform, positionX, index, order }: AnimationProps) => {
      Animated.spring(transform, {
        toValue: order === 1 ? 1 : 0.85,
        useNativeDriver: false,
      }).start();

      Animated.spring(positionX, {
        toValue: orderData(order)[0],
        useNativeDriver: false,
      }).start();

      Animated.timing(index, {
        toValue: orderData(order)[1],
        duration: 10,
        useNativeDriver: false,
      }).start();
    },
    [orderData],
  );

  switch (position) {
    case 0:
      goToPosition({
        transform: mayorTranformValue,
        positionX: mayorPositionValue,
        index: mayorZIndexValue,
        order: 1,
      });

      goToPosition({
        transform: taxTranformValue,
        positionX: taxPositionValue,
        index: taxZIndexValue,
        order: 2,
      });

      goToPosition({
        transform: supervisor1TranformValue,
        positionX: supervisor1PositionValue,
        index: supervisor1ZIndexValue,
        order: 3,
      });

      goToPosition({
        transform: supervisor2TranformValue,
        positionX: supervisor2PositionValue,
        index: supervisor2ZIndexValue,
        order: 4,
      });

      break;

    case 1:
      goToPosition({
        transform: mayorTranformValue,
        positionX: mayorPositionValue,
        index: mayorZIndexValue,
        order: 4,
      });

      goToPosition({
        transform: taxTranformValue,
        positionX: taxPositionValue,
        index: taxZIndexValue,
        order: 1,
      });

      goToPosition({
        transform: supervisor1TranformValue,
        positionX: supervisor1PositionValue,
        index: supervisor1ZIndexValue,
        order: 2,
      });

      goToPosition({
        transform: supervisor2TranformValue,
        positionX: supervisor2PositionValue,
        index: supervisor2ZIndexValue,
        order: 3,
      });

      break;

    case 2:
      goToPosition({
        transform: mayorTranformValue,
        positionX: mayorPositionValue,
        index: mayorZIndexValue,
        order: 3,
      });

      goToPosition({
        transform: taxTranformValue,
        positionX: taxPositionValue,
        index: taxZIndexValue,
        order: 4,
      });

      goToPosition({
        transform: supervisor1TranformValue,
        positionX: supervisor1PositionValue,
        index: supervisor1ZIndexValue,
        order: 1,
      });

      goToPosition({
        transform: supervisor2TranformValue,
        positionX: supervisor2PositionValue,
        index: supervisor2ZIndexValue,
        order: 2,
      });

      break;

    case 3:
      goToPosition({
        transform: mayorTranformValue,
        positionX: mayorPositionValue,
        index: mayorZIndexValue,
        order: 2,
      });

      goToPosition({
        transform: taxTranformValue,
        positionX: taxPositionValue,
        index: taxZIndexValue,
        order: 3,
      });

      goToPosition({
        transform: supervisor1TranformValue,
        positionX: supervisor1PositionValue,
        index: supervisor1ZIndexValue,
        order: 4,
      });

      goToPosition({
        transform: supervisor2TranformValue,
        positionX: supervisor2PositionValue,
        index: supervisor2ZIndexValue,
        order: 1,
      });

      break;

    default:
      break;
  }

  return (
    <Container>
      {editMode && (
        <EditButton
          finished={responsibleFinished(position)}
          modal={responsibleSelected(position)}
          modalData={responsibleData(position)}
          text={responsibleSelected(position)}
          type="responsibles"
          nonExistent={responsibleData(position) === null}
        />
      )}
      <Title>Responsáveis</Title>
      <Animated.View
        style={{
          width: '75%',
          transform: [{ scale: mayorTranformValue }],
          position: 'absolute',
          top: 50,
          left: mayorPositionValue,
          zIndex: mayorZIndexValue,
        }}
      >
        <ResponsibleCard
          editMode={editMode}
          data={city.mayor}
          type="Prefeito"
        />
      </Animated.View>
      <Animated.View
        style={{
          width: '75%',
          transform: [{ scale: taxTranformValue }],
          position: 'absolute',
          top: 50,
          left: taxPositionValue,
          zIndex: taxZIndexValue,
        }}
      >
        <ResponsibleCard
          editMode={editMode}
          data={city.tax_responsible}
          type="Responsável Tributário"
        />
      </Animated.View>
      <Animated.View
        style={{
          width: '75%',
          transform: [{ scale: supervisor1TranformValue }],
          position: 'absolute',
          top: 50,
          left: supervisor1PositionValue,
          zIndex: supervisor1ZIndexValue,
        }}
      >
        <ResponsibleCard
          editMode={editMode}
          data={city.supervisor1}
          type="Fiscal 1"
        />
      </Animated.View>
      <Animated.View
        style={{
          width: '75%',
          transform: [{ scale: supervisor2TranformValue }],
          position: 'absolute',
          top: 50,
          left: supervisor2PositionValue,
          zIndex: supervisor2ZIndexValue,
        }}
      >
        <ResponsibleCard
          editMode={editMode}
          data={city.supervisor2}
          type="Fiscal 2"
        />
      </Animated.View>
      <LeftSwipeButton onPress={handleSwipeLeft}>
        <Feather name="chevron-left" color="#252525" size={70} />
      </LeftSwipeButton>
      <RightSwipeButton onPress={handleSwipeRight}>
        <Feather name="chevron-right" color="#252525" size={70} />
      </RightSwipeButton>
    </Container>
  );
};

export default Responsibles;
