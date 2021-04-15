import { inject, injectable } from 'tsyringe';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import IUpdateCityDTO from '@modules/cities/dtos/IUpdateCityDTO';

import clearCityName from '@shared/infra/http/utils/removeUndefined';

import AppError from '@shared/errors/AppError';
import City from '@modules/cities/infra/typeorm/entities/City';

@injectable()
class UpdateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({
    id,
    name,
    uf,
    avatar_url,
    begin_validity,
    final_validity,
    contract_type,
    contract_value,
    agreement,
    mayor,
    tax_responsible,
    supervisor1,
    supervisor2,
    vtn1,
    vtn2,
    vtn3,
    vtn4,
    vtn5,
    tasks,
  }: IUpdateCityDTO): Promise<City> {
    const exists = await this.citiesRepository.findBy('id', id);

    if (!exists) {
      throw new AppError('City not found');
    }

    if (name) {
      const cleanName = clearCityName(name);

      const nameUsed = await this.citiesRepository.findBy('name', cleanName);

      if (nameUsed && nameUsed.id !== id) {
        throw new AppError('City name already used');
      }
    }

    try {
      const city = await this.citiesRepository.update({
        id,
        name,
        uf,
        avatar_url,
        begin_validity,
        final_validity,
        contract_type,
        contract_value,
        agreement,
        mayor,
        tax_responsible,
        supervisor1,
        supervisor2,
        vtn1,
        vtn2,
        vtn3,
        vtn4,
        vtn5,
        tasks,
      });

      return city;
    } catch (e) {
      throw new AppError('Invalid data to update');
    }
  }
}

export default UpdateCityService;
