import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import AppError from '@shared/errors/AppError';

import {
  ContractType,
  Agreement,
} from '@modules/cities/infra/typeorm/entities/City';

import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import CreateCityService from './CreateCityService';

let fakeCitiesRepository: FakeCitiesRepository;
let createCityService: CreateCityService;

describe('CreateCityService', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    createCityService = new CreateCityService(fakeCitiesRepository);
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

  it('should be able to create a new city', async () => {
    const city = await createCityService.execute(cityData);

    expect(city).toHaveProperty('id');
  });

  it('should not be able to create two cities with the same name', async () => {
    await createCityService.execute(cityData);

    await expect(createCityService.execute(cityData)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to handle with database erros', async () => {
    jest.spyOn(fakeCitiesRepository, 'create').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(createCityService.execute(cityData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
