import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICreateActivityDTO from '@modules/activities/dtos/ICreateActivityDTO';
import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';

import isValidDate from '@shared/infra/http/utils/isValidDate';

import AppError from '@shared/errors/AppError';

@injectable()
class CreateActivityService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(activityData: ICreateActivityDTO) {
    if (isValidDate(activityData.deadline)) {
      throw new AppError('Invalid deadline');
    }

    try {
      const activity = await this.activitiesRepository.create(activityData);

      delete activity.responsibles;
      delete activity.requester;
      delete activity.cities;

      return activity;
    } catch (err) {
      throw new AppError('Invalid activity data');
    }
  }
}

export default CreateActivityService;
