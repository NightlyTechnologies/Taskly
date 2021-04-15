import React from 'react';
import { useCity } from '../../hooks/city';
import { City } from '../../pages/Cities/CityList';

import formatDate from '../../utils/formatDate';
import formatValue from '../../utils/formatValue';

import EditButton from '../EditButton';

import {
  Container,
  Title,
  Section,
  Key,
  Value,
  TypeSection,
  Types,
  Type,
  TypeText,
} from './styles';

interface CityDetailsCardProps {
  city: City;
  editMode: boolean;
}

const CityDetailsCard: React.FC<CityDetailsCardProps> = ({
  city,
  editMode,
}) => {
  const { dataWasModify } = useCity();

  return (
    <>
      {editMode && (
        <EditButton
          finished={dataWasModify.cityDetailsWasModify}
          modal="details"
          modalData={city}
          text="Detalhes"
        />
      )}
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
        <Title>Detalhes do Município</Title>
        <Section>
          <Key>Início da vigência:</Key>
          <Value>{formatDate(city.begin_validity, true)}</Value>
        </Section>
        <Section>
          <Key>Fim da vigência:</Key>
          <Value>{formatDate(city.final_validity, true)}</Value>
        </Section>
        <Section>
          <Key>Valor de contrato:</Key>
          {city.contract_value && (
            <Value>{`R$${formatValue(city.contract_value)}`}</Value>
          )}
        </Section>
        <TypeSection>
          <Key>Tipo de contrato:</Key>
          <Types type="double">
            <Type color="black" selected={city.contract_type === 'online'}>
              <TypeText selected={city.contract_type === 'online'}>
                Online
              </TypeText>
            </Type>
            <Type selected={city.contract_type === 'presential'}>
              <TypeText selected={city.contract_type === 'presential'}>
                Presencial
              </TypeText>
            </Type>
          </Types>
        </TypeSection>
        <TypeSection>
          <Key>Situação do convênio:</Key>
          <Types>
            <Type color="red" selected={city.agreement === 'denounced'}>
              <TypeText selected={city.agreement === 'denounced'}>
                Denunciado
              </TypeText>
            </Type>
            <Type color="black" selected={city.agreement === 'nonexistent'}>
              <TypeText selected={city.agreement === 'nonexistent'}>
                Inexistente
              </TypeText>
            </Type>
            <Type selected={city.agreement === 'ok'}>
              <TypeText selected={city.agreement === 'ok'}>Ok</TypeText>
            </Type>
          </Types>
          <Types type="extended">
            <Type
              color="red"
              extended
              selected={city.agreement === 'unable_worker'}
            >
              <TypeText selected={city.agreement === 'unable_worker'}>
                Servidor não habilitado
              </TypeText>
            </Type>
            <Type
              color="red"
              extended
              selected={city.agreement === 'unpublished'}
            >
              <TypeText selected={city.agreement === 'unpublished'}>
                Assinado não publicado
              </TypeText>
            </Type>
          </Types>
        </TypeSection>
      </Container>
    </>
  );
};

export default CityDetailsCard;
