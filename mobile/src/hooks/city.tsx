import React, { createContext, useState, useCallback, useContext } from 'react';
import api from '../services/api';

import { CityDetails, Tasks } from '../pages/Cities/CityDetails';
import { City } from '../pages/Cities/CityList';

export interface CityDetailsCard {
  begin_validity: string;
  final_validity: string;
  contract_type: 'online' | 'presential';
  contract_value: string;
  agreement:
  | 'ok'
  | 'nonexistent'
  | 'denounced'
  | 'unable_worker'
  | 'unpublished';
}

interface Mayor {
  name: string;
  birth: string;
  email: string;
  phone: string;
  reelected: boolean;
}

interface TaxResponsible {
  name: string;
  birth: string;
  email: string;
  phone: string;
  role: string;
}

interface Supervisor {
  name: string;
  qualification: string;
  email: string;
  phone: string;
  role: string;
}

interface Vtn {
  good: string;
  regular: string;
  restricted: string;
  planted: string;
  natural: string;
  preservation: string;
}

interface EditData extends CityDetailsCard {
  mayor: Mayor;
  tax_responsible: TaxResponsible;
  supervisor1: Supervisor;
  supervisor2: Supervisor;
  vtn1: Vtn;
  vtn2: Vtn;
  vtn3: Vtn;
  vtn4: Vtn;
  vtn5: Vtn;
  tasks: Tasks;
}

interface DataWasModify {
  cityDetailsWasModify: boolean;
  mayorWasModify: boolean;
  taxResponsibleWasModify: boolean;
  supervisor1WasModify: boolean;
  supervisor2WasModify: boolean;
  vtn1WasModify: boolean;
  vtn2WasModify: boolean;
  vtn3WasModify: boolean;
  vtn4WasModify: boolean;
  vtn5WasModify: boolean;
  tasksWasModify: boolean;
}

interface UpdateCity {
  data: CityDetailsCard | Mayor | TaxResponsible | Supervisor | Vtn | Tasks;
  type:
  | 'details'
  | 'mayor'
  | 'tax_responsible'
  | 'supervisor1'
  | 'supervisor2'
  | '2015'
  | '2016'
  | '2017'
  | '2018'
  | '2019'
  | 'tasks';
}

interface CityContextData {
  cities: City[];
  updateCities: (cityList: City[]) => void;
  updateCity: (data: UpdateCity) => void;
  cancelEdit: () => void;
  submitEdit: (city_id: string) => Promise<CityDetails | null>;
  dataWasModify: DataWasModify;
}

const CityContext = createContext<CityContextData>({} as CityContextData);

export const CityProvider: React.FC = ({ children }) => {
  const [dataWasModify, setDataWasModify] = useState<DataWasModify>(
    {} as DataWasModify,
  );
  const [editData, setEditData] = useState<EditData>({} as EditData);
  const [cities, setCities] = useState<City[]>([]);

  const updateCities = useCallback((cityList: City[]) => {
    setCities(cityList);
  }, []);

  const updateCity = useCallback(
    ({ data, type }: UpdateCity) => {
      switch (type) {
        case 'mayor':
          setEditData({ ...editData, mayor: data as Mayor });
          setDataWasModify({ ...dataWasModify, mayorWasModify: true });
          break;

        case 'tax_responsible':
          setEditData({ ...editData, tax_responsible: data as TaxResponsible });
          setDataWasModify({ ...dataWasModify, taxResponsibleWasModify: true });
          break;

        case 'supervisor1':
          setEditData({ ...editData, supervisor1: data as Supervisor });
          setDataWasModify({ ...dataWasModify, supervisor1WasModify: true });
          break;

        case 'supervisor2':
          setEditData({ ...editData, supervisor2: data as Supervisor });
          setDataWasModify({ ...dataWasModify, supervisor2WasModify: true });
          break;

        case '2015':
          setEditData({ ...editData, vtn1: data as Vtn });
          setDataWasModify({ ...dataWasModify, vtn1WasModify: true });
          break;

        case '2016':
          setEditData({ ...editData, vtn2: data as Vtn });
          setDataWasModify({ ...dataWasModify, vtn2WasModify: true });
          break;

        case '2017':
          setEditData({ ...editData, vtn3: data as Vtn });
          setDataWasModify({ ...dataWasModify, vtn3WasModify: true });
          break;

        case '2018':
          setEditData({ ...editData, vtn4: data as Vtn });
          setDataWasModify({ ...dataWasModify, vtn4WasModify: true });
          break;

        case '2019':
          setEditData({ ...editData, vtn5: data as Vtn });
          setDataWasModify({ ...dataWasModify, vtn5WasModify: true });
          break;

        case 'tasks':
          setEditData({ ...editData, tasks: data as Tasks });
          setDataWasModify({ ...dataWasModify, tasksWasModify: true });
          break;

        default:
          setEditData({ ...editData, ...data });
          setDataWasModify({ ...dataWasModify, cityDetailsWasModify: true });
          break;
      }
    },
    [editData, dataWasModify],
  );

  const cancelEdit = useCallback(() => {
    setEditData({} as EditData);
    setDataWasModify({} as DataWasModify);
  }, []);

  const submitEdit = useCallback(
    async (city_id: string) => {
      if (Object.keys(editData)[0]) {
        const response = await api.put(`cities/${city_id}`, editData);

        const updatedCity: CityDetails = response.data;

        cancelEdit();
        api.get<City[]>('cities').then(apiResponse => {
          setCities(apiResponse.data);
        });

        return updatedCity;
      }

      cancelEdit();
      return null;
    },
    [editData, cancelEdit],
  );

  return (
    <CityContext.Provider
      value={{
        cities,
        updateCities,
        updateCity,
        cancelEdit,
        submitEdit,
        dataWasModify,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export function useCity(): CityContextData {
  const context = useContext(CityContext);

  if (!context) {
    throw new Error('useCity must be used within an CityProvider');
  }

  return context;
}
