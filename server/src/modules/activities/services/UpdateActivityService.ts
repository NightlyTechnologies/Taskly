import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import Activity from '@modules/activities/infra/typeorm/entities/Activity';

import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';
import IUpdateActivityDTO from '@modules/activities/dtos/IUpdateActivityDTO';

import AppError from '@shared/errors/AppError';

@injectable()
class UpdateActivityService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(
    {
      id,
      title,
      requester,
      responsibles,
      cities,
      status,
      deadline,
      description,
    }: IUpdateActivityDTO,
    userId: string,
  ): Promise<Activity> {
    const activity = await this.activitiesRepository.findBy('id', id, [
      'requester',
    ]);

    if (!activity) {
      throw new AppError('Actvity not found');
    }

    if (activity.requester.id !== userId) {
      throw new AppError('Just requester can update the activity!', 403);
    }

    const todayString = new Date().toLocaleDateString('en-US', {
      timeZone: 'America/Sao_Paulo',
    });

    if (deadline && deadline.toLocaleDateString() < todayString) {
      throw new AppError('Invalid deadline');
    }

    try {
      const updatedActivity = await this.activitiesRepository.update(activity, {
        id,
        title,
        requester,
        responsibles,
        cities,
        status,
        deadline,
        description,
      });

      delete updatedActivity.responsibles;
      delete updatedActivity.requester;
      delete updatedActivity.cities;

      return updatedActivity;
    } catch (err) {
      throw new AppError('Invalid data to update activity');
    }
  }
}

export default UpdateActivityService;
