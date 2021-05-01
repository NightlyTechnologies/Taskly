import { inject, injectable } from 'tsyringe';

import Sub_Activity from '@modules/activities/infra/typeorm/entities/Sub_Activity';

import ISub_ActivitiesRepository from '@modules/activities/repositories/ISub_ActivitiesRepository';
import IUpdateSub_ActivityDTO from '@modules/activities/dtos/IUpdateSub_ActivityDTO';

import isValidDate from '@shared/infra/http/utils/isValidDate';

import AppError from '@shared/errors/AppError';
import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';

@injectable()
class UpdateSub_ActivityService {
  constructor(
    @inject('Sub_ActivitiesRepository')
    private sub_ActivitiesRepository: ISub_ActivitiesRepository,
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(
    {
      id,
      title,
      responsibles,
      status,
      deadline,
      description,
    }: IUpdateSub_ActivityDTO,
    requesterId: string,
  ): Promise<Sub_Activity> {
    const sub_activity = await this.sub_ActivitiesRepository.findBy('id', id, [
      'responsibles',
      'activity',
    ]);

    if (!sub_activity) {
      throw new AppError('Sub Actvity not found');
    }

    const activity = await this.activitiesRepository.findBy(
      'id',
      sub_activity.activity.id,
      ['requester', 'responsibles'],
    );

    if (!activity) {
      throw new AppError('Sub Actvity not found');
    }

    if (
      !sub_activity.responsibles
        .map((responsible): string => responsible.id)
        .includes(requesterId)
      && !activity.responsibles
        .map((responsible): string => responsible.id)
        .includes(requesterId)
      && activity.requester.id !== requesterId
    ) {
      throw new AppError(
        'You are not allowed to update this sub_activity!',
        403,
      );
    }

    if (deadline && isValidDate(deadline)) {
      throw new AppError('Invalid deadline');
    }

    try {
      const updatedSub_Activity = await this.sub_ActivitiesRepository.update(
        sub_activity,
        {
          id,
          title,
          responsibles,
          status,
          deadline,
          description,
        },
      );

      return updatedSub_Activity;
    } catch (err) {
      throw new AppError('Invalid data to update sub_activity');
    }
  }
}

export default UpdateSub_ActivityService;
