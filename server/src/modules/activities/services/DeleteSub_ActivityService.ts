import { inject, injectable } from 'tsyringe';

import ISub_ActivitiesRepository from '@modules/activities/repositories/ISub_ActivitiesRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class DeleteSub_ActivityService {
  constructor(
    @inject('Sub_ActivitiesRepository')
    private sub_ActivitiesRepository: ISub_ActivitiesRepository,
  ) {}

  public async execute(activityId: string, requesterId: string): Promise<void> {
    const sub_activity = await this.sub_ActivitiesRepository.findBy(
      'id',
      activityId,
      ['responsibles'],
    );

    if (!sub_activity) {
      throw new AppError('Invalid sub_activity!');
    }

    if (
      !sub_activity.responsibles
        .map((responsible): string => responsible.id)
        .includes(requesterId)
    ) {
      throw new AppError(
        'Just activity responsibles can delete the sub_activity!',
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
