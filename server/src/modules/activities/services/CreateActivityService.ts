import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICreateActivityDTO from '@modules/activities/dtos/ICreateActivityDTO';
import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class CreateActivityService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(activityData: ICreateActivityDTO) {
    const todayString = new Date().toLocaleDateString();
    const today = new Date(todayString);

    if (activityData.deadline < today) {
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
