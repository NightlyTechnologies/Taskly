import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';

import AppError from '@shared/errors/AppError';
import clearCityName from '@modules/cities/infra/utils/clearCityName';

import {
  ContractType,
  Agreement,
} from '@modules/cities/infra/typeorm/entities/City';

import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import UpdateCityService from './UpdateCityService';

let fakeCitiesRepository: FakeCitiesRepository;
let updateCityService: UpdateCityService;

describe('UpdateCityService', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    updateCityService = new UpdateCityService(fakeCitiesRepository);
  });

  const cityData: ICreateCityDTO = {
    avatar_url: 'sla',
    name: clearCityName('Ponta-grossa'),
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

  it('should be able to update the name of the city', async () => {
    const { id } = await fakeCitiesRepository.create(cityData);
    const name = clearCityName(`${cityData.name}updated`);
    const city = await updateCityService.execute({
      id,
      name,
    });

    expect(city.name).toBe(name);
  });

  it('should be able to partially update the mayor of the city', async () => {
    const { id } = await fakeCitiesRepository.create(cityData);
    const { mayor } = cityData;

    const name = `${mayor.name}updated`;

    const city = await updateCityService.execute({
      id,
      mayor: { ...mayor, name },
    });

    expect(city.mayor).toMatchObject({ ...mayor, name });
  });

  it('should be able to update the mayor of the city', async () => {
    const { id } = await fakeCitiesRepository.create(cityData);
    const { mayor } = cityData;

    const updatedMayor = {
      name: `${mayor.name}updated`,
      birth: new Date(),
      email: `${mayor.email}updated`,
      phone: `${mayor.phone}updated`,
      reelected: !mayor.reelected,
    };

    const city = await updateCityService.execute({
      id,
      mayor: updatedMayor,
    });

    expect(city.mayor).toBe(updatedMayor);
  });

  it('should not be able to update city name to an used name', async () => {
    const { id } = await fakeCitiesRepository.create(cityData);
    const name = clearCityName(`${cityData.name}updated`);

    await fakeCitiesRepository.create({
      ...cityData,
      name,
    });

    await expect(
      updateCityService.execute({
        id,
        name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update with invalid id', async () => {
    await expect(
      updateCityService.execute({ id: 'uuid', name: cityData.name }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to handle with database errors', async () => {
    const { id } = await fakeCitiesRepository.create(cityData);
    jest.spyOn(fakeCitiesRepository, 'update').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(
      updateCityService.execute({ id, name: cityData.name }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
