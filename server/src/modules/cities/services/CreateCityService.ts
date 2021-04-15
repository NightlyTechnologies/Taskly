import { inject, injectable } from 'tsyringe';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import AppError from '@shared/errors/AppError';
import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import clearCityName from '@modules/cities/infra/utils/clearCityName';
import City from '@modules/cities/infra/typeorm/entities/City';

@injectable()
class CreateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(data: ICreateCityDTO): Promise<City> {
    const cleanName = clearCityName(data.name);

    const usedName = await this.citiesRepository.findBy('name', cleanName);

    if (usedName) {
      throw new AppError('City name already used');
    }

    const cleanData = { ...data, name: cleanName };

    try {
      const city = await this.citiesRepository.create(cleanData);

      return city;
    } catch (e) {
      throw new AppError('Invalid city data');
    }
  }
}

export default CreateCityService;
