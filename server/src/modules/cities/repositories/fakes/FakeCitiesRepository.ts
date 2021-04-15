import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import City from '@modules/cities/infra/typeorm/entities/City';

import { v4 as uuid } from 'uuid';

import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import IUpdateCityDTO from '@modules/cities/dtos/IUpdateCityDTO';

const date = new Date();

class FakeUsersRepository implements ICitiesRepository {
  private cities: City[] = [];

  public async create({
    avatar_url,
    name,
    uf,
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
  }: ICreateCityDTO): Promise<City> {
    const city = new City();

    Object.assign(city, {
      id: uuid(),
      avatar_url,
      name,
      uf,
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
      created_at: date,
      updated_at: date,
    });

    this.cities.push(city);

    return city;
  }

  public async update(data: IUpdateCityDTO): Promise<City> {
    const city = new City();

    const cityIndex = this.cities.findIndex(
      (current) => current.id === data.id,
    );

    Object.assign(city, { ...this.cities[cityIndex], ...data });

    this.cities[cityIndex] = city;

    return city;
  }

  public async findBy(
    field: keyof City,
    value: string,
  ): Promise<City | undefined> {
    const findUser = this.cities.find((city) => city[field] === value);

    return findUser;
  }

  public async findAll(
    fields?: Array<keyof City>,
  ): Promise<City[] | Partial<City>[]> {
    if (fields) {
      const filteredCities: Partial<City>[] = [];

      this.cities.forEach((city) => {
        let filteredCity = {};

        fields.forEach((field: keyof City) => {
          filteredCity = { ...filteredCity, [field]: city[field] };
        });

        filteredCities.push(filteredCity);
      });

      return filteredCities;
    }

    return this.cities;
  }
}

export default FakeUsersRepository;
