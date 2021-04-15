import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather } from '@expo/vector-icons';

import CityDetailsCardModal from '../Modal/CityDetailsCardModal';
import ResponsiblesModal from '../Modal/ResponsiblesModal';
import VtnCardModal from '../Modal/VtnCardModal';
import TasksCardModal from '../Modal/TasksCardModal';

import { City } from '../../pages/Cities/CityList';
import { Responsible, Vtn, Tasks } from '../../pages/Cities/CityDetails';
import { ResponsiblesType } from '../Responsibles';

import { Container, EditText, DetailText } from './styles';

interface EditButtonProps {
  type?: 'responsibles' | 'vtn' | 'tasks';
  text: string;
  modal: string;
  modalData: Responsible | City | Vtn | Tasks;
  finished?: boolean;
  nonExistent?: boolean;
}
interface ModalCardProps {
  modal: string;
  modalData: Responsible | City | Vtn | Tasks;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCard: React.FC<ModalCardProps> = ({
  modal,
  modalData,
  isOpen,
  setModalIsOpen,
}) => {
  switch (modal) {
    case 'details':
      return (
        <CityDetailsCardModal
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          city={modalData as City}
        />
      );

    case 'Prefeito':
      return (
        <ResponsiblesModal
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          type={modal as ResponsiblesType}
          responsible={modalData as Responsible}
        />
      );

    case 'Responsável Tributário':
      return (
        <ResponsiblesModal
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          type={modal as ResponsiblesType}
          responsible={modalData as Responsible}
        />
      );

    case 'Fiscal 1':
      return (
        <ResponsiblesModal
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          type={modal as ResponsiblesType}
          responsible={modalData as Responsible}
        />
      );

    case 'Fiscal 2':
      return (
        <ResponsiblesModal
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          type={modal as ResponsiblesType}
          responsible={modalData as Responsible}
        />
      );

    case '2019':
      return (
        <VtnCardModal
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          data={modalData as Vtn}
        />
      );

    case '2018':
      return (
        <VtnCardModal
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          data={modalData as Vtn}
        />
      );

    case '2017':
      return (
        <VtnCardModal
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          data={modalData as Vtn}
        />
      );

    case '2016':
      return (
        <VtnCardModal
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          data={modalData as Vtn}
        />
      );

    case '2015':
      return (
        <VtnCardModal
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          data={modalData as Vtn}
        />
      );

    default:
      return (
        <TasksCardModal
          isOpen={isOpen}
          setModalIsOpen={setModalIsOpen}
          data={modalData as Tasks}
        />
      );
  }
};

const EditButton: React.FC<EditButtonProps> = ({
  type,
  text,
  modal,
  modalData,
  finished,
  nonExistent,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const switchColor = () => {
    if (finished) {
      return ['#21d353', '#5bd47d'];
    }

    if (nonExistent) {
      return ['#252525', '#444040'];
    }

    return ['#EB3349', '#F45C43'];
  };

  return (
    <>
      {!nonExistent && (
        <ModalCard
          setModalIsOpen={setModalIsOpen}
          isOpen={modalIsOpen}
          modalData={modalData}
          modal={modal}
        />
      )}
      <Container
        disabled={nonExistent || finished}
        onPress={() => setModalIsOpen(true)}
        type={type}
      >
        <LinearGradient
          colors={switchColor()}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {finished && (
            <>
              <Feather name="check" color="#fff" size={40} />
              <EditText>Editado</EditText>
              <DetailText>com sucesso!</DetailText>
            </>
          )}
          {!finished && !nonExistent && (
            <>
              <MaterialIcons name="edit" color="#fff" size={40} />
              <EditText>Editar</EditText>
              <DetailText>{text}</DetailText>
            </>
          )}
          {nonExistent && (
            <>
              <Feather name="x" color="#fff" size={40} />
              <EditText>{text}</EditText>
              <DetailText>inexistente!</DetailText>
            </>
          )}
        </LinearGradient>
      </Container>
    </>
  );
};

export default EditButton;
