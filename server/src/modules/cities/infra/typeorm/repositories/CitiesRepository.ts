import { getRepository, getManager, Repository } from 'typeorm';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import IUpdateCityDTO from '@modules/cities/dtos/IUpdateCityDTO';

import City from '@modules/cities/infra/typeorm/entities/City';
import Mayor from '@modules/cities/infra/typeorm/entities/Mayor';
import Tax from '@modules/cities/infra/typeorm/entities/Tax';
import Supervisor from '@modules/cities/infra/typeorm/entities/Supervisor';
import Vtn from '@modules/cities/infra/typeorm/entities/Vtn';
import Tasks from '@modules/cities/infra/typeorm/entities/Tasks';
import removeUndefined from '@shared/infra/http/utils/removeUndefined';
import removeEmptyObjects from '@shared/infra/http/utils/removeEmptyObjects';

class CitiesRepository implements ICitiesRepository {
  private ormCityRepository: Repository<City>;

  constructor() {
    this.ormCityRepository = getRepository(City, process.env.CONNECTION_NAME);
  }

  public async create({
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
  }: ICreateCityDTO): Promise<City> {
    return getManager(process.env.CONNECTION_NAME).transaction(
      async (entityManager) => {
        const mayorInstance = entityManager.create(Mayor, mayor);

        const vtn1Instance = entityManager.create(Vtn, vtn1);
        const vtn2Instance = entityManager.create(Vtn, vtn2);
        const vtn3Instance = entityManager.create(Vtn, vtn3);
        const vtn4Instance = entityManager.create(Vtn, vtn4);
        const vtn5Instance = entityManager.create(Vtn, vtn5);

        const city = new City();

        city.name = name;
        city.uf = uf;
        city.avatar_url = avatar_url;

        if (begin_validity) {
          city.begin_validity = begin_validity;
        }

        if (final_validity) {
          city.final_validity = final_validity;
        }

        if (contract_type) {
          city.contract_type = contract_type;
        }

        if (contract_value) {
          city.contract_value = contract_value;
        }

        if (agreement) {
          city.agreement = agreement;
        }

        city.mayor = mayorInstance;

        if (tax_responsible) {
          const taxInstance = entityManager.create(Tax, tax_responsible);
          await entityManager.save(taxInstance);
          city.tax_responsible = taxInstance;
        }

        if (supervisor1) {
          const supervisor1Instance = entityManager.create(
            Supervisor,
            supervisor1,
          );
          await entityManager.save(supervisor1Instance);
          city.supervisor1 = supervisor1Instance;
        }

        if (supervisor2) {
          const supervisor2Instance = entityManager.create(
            Supervisor,
            supervisor2,
          );
          await entityManager.save(supervisor2Instance);
          city.supervisor2 = supervisor2Instance;
        }

        city.vtn1 = vtn1Instance;
        city.vtn2 = vtn2Instance;
        city.vtn3 = vtn3Instance;
        city.vtn4 = vtn4Instance;
        city.vtn5 = vtn5Instance;

        if (tasks) {
          const tasksInstance = entityManager.create(Tasks, tasks);
          await entityManager.save(tasksInstance);
          city.tasks = tasksInstance;
        }

        const cityInstance = entityManager.create(City, city);

        await entityManager.save(cityInstance);

        return cityInstance;
      },
    );
  }

  public async update(data: IUpdateCityDTO): Promise<City> {
    const city = await this.ormCityRepository.findOne(data.id);

    if (!city) {
      throw new Error('City not found');
    }

    const filteredData = removeUndefined(data);

    const mergedCity = {
      ...city,
      ...filteredData,
      mayor: { ...city.mayor, ...filteredData.mayor },
      tax_responsible: {
        ...city.tax_responsible,
        ...filteredData.tax_responsible,
      },
      supervisor1: { ...city.supervisor1, ...filteredData.supervisor1 },
      supervisor2: { ...city.supervisor2, ...filteredData.supervisor2 },
      vtn1: { ...city.vtn1, ...filteredData.vtn1 },
      vtn2: { ...city.vtn2, ...filteredData.vtn2 },
      vtn3: { ...city.vtn3, ...filteredData.vtn3 },
      vtn4: { ...city.vtn4, ...filteredData.vtn4 },
      vtn5: { ...city.vtn5, ...filteredData.vtn5 },
      tasks: { ...city.tasks, ...filteredData.tasks },
    };

    const mergedCityClean = removeEmptyObjects(mergedCity);

    await this.ormCityRepository.save(mergedCityClean);

    const updatedCity = await this.findBy('id', mergedCity.id);

    if (!updatedCity) {
      throw new Error();
    } else {
      return updatedCity;
    }
  }

  public async findAll(fields?: Array<keyof City>): Promise<City[]> {
    const cities = await this.ormCityRepository.find({
      select: fields,
    });

    return cities;
  }

  public async findBy(
    field: keyof City,
    value: string,
  ): Promise<City | undefined> {
    const city = await this.ormCityRepository.findOne({
      where: {
        [field]: value,
      },
    });

    return city;
  }
}

export default CitiesRepository;
