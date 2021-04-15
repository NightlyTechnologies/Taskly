import City from '@modules/cities/infra/typeorm/entities/City';

import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import IUpdateCityDTO from '@modules/cities/dtos/IUpdateCityDTO';

export default interface ICitiesRepository {
  create(city: ICreateCityDTO): Promise<City>;
  update(data: IUpdateCityDTO): Promise<City>;
  findBy(field: keyof City, value: string): Promise<City | undefined>;
  findAll(fields?: Array<keyof City>): Promise<City[] | Partial<City>[]>;
}
