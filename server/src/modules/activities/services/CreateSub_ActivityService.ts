import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICreateSub_ActivityDTO from '@modules/activities/dtos/ICreateSub_ActivityDTO';
import ISub_ActivitiesRepository from '@modules/activities/repositories/ISub_ActivitiesRepository';

import isValidDate from '@shared/infra/http/utils/isValidDate';

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
    if (isValidDate(sub_ActivityData.deadline)) {
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
