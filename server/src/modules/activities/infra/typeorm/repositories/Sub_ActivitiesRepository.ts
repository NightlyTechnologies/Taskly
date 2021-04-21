import { getRepository, Repository } from 'typeorm';

import ISub_ActivityRepository from '@modules/activities/repositories/ISub_ActivitiesRepository';
import ICreateSub_ActivityDTO from '@modules/activities/dtos/ICreateSub_ActivityDTO';

import Sub_Activity from '@modules/activities/infra/typeorm/entities/Sub_Activity';
import { Status } from '@modules/activities/infra/typeorm/entities/Activity';

import AppError from '@shared/errors/AppError';

import ActivitiesRepository from 'modules/activities/infra/typeorm/repositories/ActivitiesRepository';
import User from '@modules/users/infra/typeorm/entities/User';

class Sub_ActivitiesRepository implements ISub_ActivityRepository {
  private ormSub_ActivityRepository: Repository<Sub_Activity>;

  private ormUserRepository: Repository<User>;

  private activitiesRepository: ActivitiesRepository;

  constructor() {
    this.activitiesRepository = new ActivitiesRepository();
    this.ormSub_ActivityRepository = getRepository(
      Sub_Activity,
      process.env.CONNECTION_NAME,
    );
    this.ormUserRepository = getRepository(User, process.env.CONNECTION_NAME);
  }

  public async create(
    sub_activityData: ICreateSub_ActivityDTO,
    userId: string,
  ): Promise<Sub_Activity> {
    const activity = await this.activitiesRepository.findBy(
      'id',
      sub_activityData.activity,
      ['responsibles', 'requester'],
    );

    if (!activity) {
      throw new AppError('Invalid activity!');
    }

    const activityResponsibles: string[] = activity.responsibles.map(
      (responsible) => responsible.id,
    );

    if (
      !activityResponsibles.includes(userId)
      && activity.requester.id !== userId
    ) {
      throw new AppError(
        'Only activity responsibles can create sub activities!',
        401,
      );
    }

    const responsibles = await this.ormUserRepository.find({
      where: sub_activityData.responsibles.map((responsibleId) => ({
        id: responsibleId,
      })),
    });

    const data = {
      ...sub_activityData,
      activity,
      responsibles,
      status: Status.REQUESTED,
    };

    const sub_activity = this.ormSub_ActivityRepository.create(data);

    await this.ormSub_ActivityRepository.save(sub_activity);

    return sub_activity;
  }

  public async delete(sub_activity: Sub_Activity): Promise<void> {
    await this.ormSub_ActivityRepository.remove(sub_activity);
  }

  public async findBy(
    field: keyof Sub_Activity,
    value: string,
    relations?: string[],
  ): Promise<Sub_Activity | undefined> {
    const sub_activity = await this.ormSub_ActivityRepository.findOne({
      where: {
        [field]: value,
      },
      relations,
    });

    return sub_activity;
  }
}

export default Sub_ActivitiesRepository;
