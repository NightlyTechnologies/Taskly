import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import CityDetailsService from '@modules/cities/services/CityDetailsService';

import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';

import {
  ContractType,
  Agreement,
} from '@modules/cities/infra/typeorm/entities/City';
import AppError from '@shared/errors/AppError';

let fakeCitiesRepository: FakeCitiesRepository;
let cityDetailsService: CityDetailsService;

describe('CityDetails', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    cityDetailsService = new CityDetailsService(fakeCitiesRepository);
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

  it('should be able to show city details', async () => {
    const city = await fakeCitiesRepository.create(cityData);

    const cityDetail = await cityDetailsService.execute(city.id);

    expect(cityDetail).toEqual(city);
  });

  it('should be able to return an error when city is not found', async () => {
    expect(
      cityDetailsService.execute('62160bd7-2ee9-4350-9824-5423b4fa9cc5'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to handle with database errors', async () => {
    jest.spyOn(fakeCitiesRepository, 'findBy').mockImplementationOnce(() => {
      throw new Error();
    });

    const city = await fakeCitiesRepository.create(cityData);

    expect(cityDetailsService.execute(city.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
