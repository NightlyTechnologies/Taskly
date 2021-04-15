import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICreateSub_ActivityDTO from '@modules/activities/dtos/ICreateSub_ActivityDTO';
import ISub_ActivitiesRepository from '@modules/activities/repositories/ISub_ActivitiesRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class CreateActivityService {
  constructor(
    @inject('Sub_ActivitiesRepository')
    private sub_ActivitiesRepository: ISub_ActivitiesRepository,
  ) {}

  public async execute(
    sub_ActivityData: ICreateSub_ActivityDTO,
    userId: string,
  ) {
    const todayString = new Date().toLocaleDateString();
    const today = new Date(todayString);

    if (sub_ActivityData.deadline < today) {
      throw new AppError('Invalid deadline');
    }

    try {
      const sub_activity = await this.sub_ActivitiesRepository.create(
        sub_ActivityData,
        userId,
      );

      delete sub_activity.responsibles;
      delete sub_activity.activity;

      return sub_activity;
    } catch (err) {
      throw new AppError('Invalid sub_activity data');
    }
  }
}

export default CreateActivityService;
