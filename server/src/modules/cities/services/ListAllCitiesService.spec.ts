import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import ListAllCities from '@modules/cities/services/ListAllCitiesService';

import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';

import {
  ContractType,
  Agreement,
} from '@modules/cities/infra/typeorm/entities/City';
import AppError from '@shared/errors/AppError';

let fakeCitiesRepository: FakeCitiesRepository;
let listAllCities: ListAllCities;

describe('ListAllCities', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    listAllCities = new ListAllCities(fakeCitiesRepository);
  });

  const cityData: ICreateCityDTO = {
    avatar_url: 'sla',
    name: 'Ponta-grossa',
    uf: 'PR',
    begin_validity: new Date('1-1-2000'),
    final_validity: new Date('1-1-2020'),
    contract_type: ContractType.ONLINE,
    contract_value: 120000.5,
    agreement: Agreement.OK,
    mayor: {
      name: 'Bruno',
      birth: new Date('1-1-2000'),
      email: 'bruno@gmail.com',
      phone: '49988267304',
      reelected: false,
    },
    tax_responsible: {
      name: 'Gabriel',
      birth: new Date('1-1-2000'),
      email: 'gabriel@gmail.com',
      phone: '49988267304',
      role: 'Responsável fiscal',
    },
    supervisor1: {
      name: 'Marcos',
      qualification: new Date('1-1-2000'),
      email: 'marcos@gmail.com',
      phone: '49988267304',
      role: 'Supervisor fiscal 2',
    },
    supervisor2: {
      name: 'João',
      qualification: new Date('1-1-2000'),
      email: 'joao@gmail.com',
      phone: '49988267304',
      role: 'Supervisor fiscal 2',
    },
    vtn1: {
      year: 2015,
      good: 30000.5,
      regular: 23050.54,
      restricted: 20480.2,
      planted: 18755.43,
      natural: 15407.89,
      preservation: 10534.61,
    },
    vtn2: {
      year: 2016,
      good: 30000.5,
      regular: 23050.54,
      restricted: 20480.2,
      planted: 18755.43,
      natural: 15407.89,
      preservation: 10534.61,
    },
    vtn3: {
      year: 2017,
      good: 30000.5,
      regular: 23050.54,
      restricted: 20480.2,
      planted: 18755.43,
      natural: 15407.89,
      preservation: 10534.61,
    },
    vtn4: {
      year: 2018,
      good: 30000.5,
      regular: 23050.54,
      restricted: 20480.2,
      planted: 18755.43,
      natural: 15407.89,
      preservation: 10534.61,
    },
    vtn5: {
      year: 2019,
      good: 30000.5,
      regular: 23050.54,
      restricted: 20480.2,
      planted: 18755.43,
      natural: 15407.89,
      preservation: 10534.61,
    },
    tasks: {
      audit1: true,
      audit2: true,
      audit3: true,
      audit4: true,
      audit5: true,
      cafirs: true,
      diffs: true,
    },
  };

  it('should be able to list all cities with the specific fields', async () => {
    const city1 = await fakeCitiesRepository.create(cityData);

    const city2 = await fakeCitiesRepository.create({
      ...cityData,
      name: 'Apucarana',
    });

    const cities = await listAllCities.execute();

    expect(cities).toEqual([
      {
        avatar_url: city1.avatar_url,
        id: city1.id,
        name: city1.name,
        uf: city1.uf,
        begin_validity: city1.begin_validity,
        final_validity: city1.final_validity,
        contract_value: city1.contract_value,
        contract_type: city1.contract_type,
        agreement: city1.agreement,
      },
      {
        avatar_url: city2.avatar_url,
        id: city2.id,
        name: city2.name,
        uf: city2.uf,
        begin_validity: city2.begin_validity,
        final_validity: city2.final_validity,
        contract_value: city2.contract_value,
        contract_type: city2.contract_type,
        agreement: city2.agreement,
      },
    ]);
  });

  it('should be able to handle with database errors', async () => {
    jest.spyOn(fakeCitiesRepository, 'findAll').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(listAllCities.execute()).rejects.toBeInstanceOf(AppError);
  });
});
