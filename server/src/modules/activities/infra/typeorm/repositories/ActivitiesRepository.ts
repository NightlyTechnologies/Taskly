import { getRepository, Repository } from 'typeorm';

import IActivityRepository from '@modules/activities/repositories/IActivitiesRepository';
import ICreateActivityDTO from '@modules/activities/dtos/ICreateActivityDTO';
import IUpdateActivityDTO from '@modules/activities/dtos/IUpdateActivityDTO';

import Activity, {
  Status,
} from '@modules/activities/infra/typeorm/entities/Activity';
import User from '@modules/users/infra/typeorm/entities/User';
import City from '@modules/cities/infra/typeorm/entities/City';
import removeUndefined from '@shared/infra/http/utils/removeUndefined';

class ActivitiesRepository implements IActivityRepository {
  private ormActivityRepository: Repository<Activity>;

  private ormUserRepository: Repository<User>;

  private ormCityRepository: Repository<City>;

  constructor() {
    this.ormActivityRepository = getRepository(
      Activity,
      process.env.CONNECTION_NAME,
    );
    this.ormUserRepository = getRepository(User, process.env.CONNECTION_NAME);
    this.ormCityRepository = getRepository(City, process.env.CONNECTION_NAME);
  }

  public async create(activityData: ICreateActivityDTO): Promise<Activity> {
    const responsibles = await this.ormUserRepository.find({
      where: activityData.responsibles.map((userId) => ({ id: userId })),
    });

    const cities = await this.ormCityRepository.find({
      where: activityData.cities.map((cityId) => ({ id: cityId })),
    });

    const requester = await this.ormUserRepository.findOne(
      activityData.requester,
    );

    if (!requester) {
      throw new Error('Responsible is invalid!');
    }

    const data = {
      ...activityData,
      responsibles,
      requester,
      cities,
      status: Status.REQUESTED,
    };

    const activity = this.ormActivityRepository.create(data);

    await this.ormActivityRepository.save(activity);

    return activity;
  }

  public async update(
    activity: Activity,
    activityData: IUpdateActivityDTO,
  ): Promise<Activity> {
    const filteredData = removeUndefined(activityData);

    const responsibles = activityData.responsibles?.map(
      (responsible: string) => {
        const user = new User();
        user.id = responsible;
        return user;
      }
    );

    const cities = activityData.cities?.map((city: string) => {
      const newCity = new City();
      newCity.id = city;
      return newCity;
    });

    const mergedActivity: Activity = {
      ...activity,
      ...filteredData,
      responsibles,
      cities,
    };

    const finalActivity = removeUndefined(mergedActivity);

    await this.ormActivityRepository.save(finalActivity);

    return finalActivity;
  }

  public async delete(activity: Activity): Promise<void> {
    await this.ormActivityRepository.remove(activity);
  }

  public async findAll(): Promise<Activity[]> {
    const activities = await this.ormActivityRepository
      .createQueryBuilder('activities')
      .innerJoin('activities.requester', 'requester')
      .innerJoin('activities.responsibles', 'responsibles')
      .innerJoin('activities.cities', 'cities')
      .select([
        'activities',
        'requester.id',
        'requester.name',
        'requester.avatar_url',
        'responsibles.id',
        'responsibles.name',
        'responsibles.avatar_url',
        'cities.id',
        'cities.name',
        'cities.avatar_url',
        'cities.uf',
      ])
      .getMany();

    return activities;
  }

  public async findUserActivities(userId: string): Promise<Activity[]> {
    const userActivities = await this.ormActivityRepository
      .createQueryBuilder('activities')
      .innerJoin('activities.requester', 'requester')
      .innerJoin('activities.responsibles', 'responsibles')
      .innerJoin('activities.cities', 'cities')
      .select([
        'activities',
        'requester.id',
        'requester.name',
        'requester.avatar_url',
        'responsibles.id',
        'responsibles.name',
        'responsibles.avatar_url',
        'cities.id',
        'cities.name',
        'cities.avatar_url',
        'cities.uf',
      ])
      .where('requester.id = :requester', { requester: userId })
      .orWhere('responsibles.id = :responsible', {
        responsible: userId,
      })
      .getMany();

    return userActivities;
  }

  public async findBy(
    field: keyof Activity,
    value: string,
    relations?: string[],
  ): Promise<Activity | undefined> {
    const activity = await this.ormActivityRepository.findOne({
      where: {
        [field]: value,
      },
      relations,
    });

    return activity;
  }
}

export default ActivitiesRepository;
