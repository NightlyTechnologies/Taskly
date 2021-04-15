import React from 'react';

import formatValue from '../../utils/formatValue';

import { Vtn } from '../../pages/Cities/CityDetails';

import {
  Container,
  Section,
  Key,
  Value,
  Currency,
  Amount,
  Divider,
} from './styles';

interface VtnCardProps {
  data: Vtn;
  editMode: boolean;
}

const VtnCard: React.FC<VtnCardProps> = ({ data, editMode }) => {
  if (data) {
    return (
      <Container
        editMode={editMode}
        style={
          !editMode && {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }
        }
      >
        <Section>
          <Key>Lavoura de{'\n'}Aptidão Boa</Key>
          <Value>
            <Currency>R$</Currency>
            <Amount>{formatValue(data.good)}</Amount>
          </Value>
        </Section>
        <Divider />
        <Section>
          <Key>Lavoura de{'\n'}Aptidão Regular</Key>
          <Value>
            <Currency>R$</Currency>
            <Amount>{formatValue(data.regular)}</Amount>
          </Value>
        </Section>
        <Divider />
        <Section>
          <Key>Lavoura de{'\n'}Aptidão Restrita</Key>
          <Value>
            <Currency>R$</Currency>
            <Amount>{formatValue(data.restricted)}</Amount>
          </Value>
        </Section>
        <Divider />
        <Section>
          <Key>Pastagem{'\n'}Plantada</Key>
          <Value>
            <Currency>R$</Currency>
            <Amount>{formatValue(data.planted)}</Amount>
          </Value>
        </Section>
        <Divider />
        <Section>
          <Key>Silvicultura ou{'\n'}Pastagem Natural</Key>
          <Value>
            <Currency>R$</Currency>
            <Amount>{formatValue(data.natural)}</Amount>
          </Value>
        </Section>
        <Divider />
        <Section>
          <Key>Preservação da{'\n'}Fauna ou Flora</Key>
          <Value>
            <Currency>R$</Currency>
            <Amount>{formatValue(data.preservation)}</Amount>
          </Value>
        </Section>
      </Container>
    );
  }

  return <></>;
};

export default VtnCard;
