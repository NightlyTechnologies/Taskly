import { inject, injectable } from 'tsyringe';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import AppError from '@shared/errors/AppError';
import City from '../infra/typeorm/entities/City';

@injectable()
class CityDetailsService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(id: string): Promise<City | undefined> {
    try {
      const city = await this.citiesRepository.findBy('id', id);

      if (!city) {
        throw new AppError('City not found');
      }

      return city;
    } catch (e) {
      throw new AppError('Server error', 500);
    }
  }
}

export default CityDetailsService;
