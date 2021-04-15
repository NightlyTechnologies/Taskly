import React, { useState } from 'react';
import { useCity } from '../../hooks/city';

import EditButton from '../EditButton';
import VtnCard from '../VtnCard';

import { CityDetails, Vtn as VtnType } from '../../pages/Cities/CityDetails';

import { Container, Title, Buttons, Year, YearText } from './styles';

type VtnYear = '2019' | '2018' | '2017' | '2016' | '2015';

interface VtnProps {
  editMode: boolean;
  city: CityDetails;
}

const Vtn: React.FC<VtnProps> = ({ editMode, city }) => {
  const { dataWasModify } = useCity();

  const [vtnSelected, setVtnSelected] = useState<VtnYear>('2019');

  const vtnYearData = (year: VtnYear): VtnType => {
    switch (year) {
      case '2019':
        return city.vtn5;

      case '2018':
        return city.vtn4;

      case '2017':
        return city.vtn3;

      case '2016':
        return city.vtn2;

      default:
        return city.vtn1;
    }
  };

  const vtnYearFinished = (year: VtnYear): boolean => {
    switch (year) {
      case '2019':
        return dataWasModify.vtn5WasModify;

      case '2018':
        return dataWasModify.vtn4WasModify;

      case '2017':
        return dataWasModify.vtn3WasModify;

      case '2016':
        return dataWasModify.vtn2WasModify;

      default:
        return dataWasModify.vtn1WasModify;
    }
  };

  return (
    <Container>
      {editMode && (
        <EditButton
          finished={vtnYearFinished(vtnSelected)}
          modal={vtnSelected}
          modalData={vtnYearData(vtnSelected)}
          type="vtn"
          text={vtnSelected}
        />
      )}
      <Title>Valores de Terra Nua (VTN)</Title>
      <Buttons>
        <Year
          onPress={() => setVtnSelected('2015')}
          isSelected={vtnSelected === '2015'}
        >
          <YearText isSelected={vtnSelected === '2015'}>2015</YearText>
        </Year>
        <Year
          onPress={() => setVtnSelected('2016')}
          isSelected={vtnSelected === '2016'}
        >
          <YearText isSelected={vtnSelected === '2016'}>2016</YearText>
        </Year>
        <Year
          onPress={() => setVtnSelected('2017')}
          isSelected={vtnSelected === '2017'}
        >
          <YearText isSelected={vtnSelected === '2017'}>2017</YearText>
        </Year>
        <Year
          onPress={() => setVtnSelected('2018')}
          isSelected={vtnSelected === '2018'}
        >
          <YearText isSelected={vtnSelected === '2018'}>2018</YearText>
        </Year>
        <Year
          onPress={() => setVtnSelected('2019')}
          isSelected={vtnSelected === '2019'}
        >
          <YearText isSelected={vtnSelected === '2019'}>2019</YearText>
        </Year>
      </Buttons>
      {vtnSelected === '2015' && (
        <VtnCard editMode={editMode} data={city.vtn1} />
      )}
      {vtnSelected === '2016' && (
        <VtnCard editMode={editMode} data={city.vtn2} />
      )}
      {vtnSelected === '2017' && (
        <VtnCard editMode={editMode} data={city.vtn3} />
      )}
      {vtnSelected === '2018' && (
        <VtnCard editMode={editMode} data={city.vtn4} />
      )}
      {vtnSelected === '2019' && (
        <VtnCard editMode={editMode} data={city.vtn5} />
      )}
    </Container>
  );
};

export default Vtn;
