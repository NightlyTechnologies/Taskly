import { inject, injectable } from 'tsyringe';

import ISub_ActivitiesRepository from '@modules/activities/repositories/ISub_ActivitiesRepository';

import AppError from '@shared/errors/AppError';
import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';

@injectable()
class DeleteSub_ActivityService {
  constructor(
    @inject('Sub_ActivitiesRepository')
    private sub_ActivitiesRepository: ISub_ActivitiesRepository,
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(activityId: string, requesterId: string): Promise<void> {
    const sub_activity = await this.sub_ActivitiesRepository.findBy(
      'id',
      activityId,
      ['responsibles', 'activity'],
    );

    if (!sub_activity) {
      throw new AppError('Invalid sub_activity!');
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
      !activity.responsibles
        .map((responsible): string => responsible.id)
        .includes(requesterId)
      && activity.requester.id !== requesterId
    ) {
      throw new AppError(
        'You are not allowed to update this sub_activity!',
        403,
      );
    }

    try {
      await this.sub_ActivitiesRepository.delete(sub_activity);
    } catch (err) {
      throw new AppError('Failed to delete sub_activity!');
    }
  }
}

export default DeleteSub_ActivityService;
