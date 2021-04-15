import { inject, injectable } from 'tsyringe';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import AppError from '@shared/errors/AppError';
import City from '../infra/typeorm/entities/City';

@injectable()
class ListAllCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(): Promise<City[] | Partial<City>[]> {
    try {
      const cities = await this.citiesRepository.findAll([
        'avatar_url',
        'id',
        'name',
        'uf',
        'begin_validity',
        'final_validity',
        'contract_value',
        'contract_type',
        'agreement',
      ]);

      return cities;
    } catch (e) {
      throw new AppError('Server error', 500);
    }
  }
}

export default ListAllCityService;
