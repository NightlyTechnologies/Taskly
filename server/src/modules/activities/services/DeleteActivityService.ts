import { inject, injectable } from 'tsyringe';

import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class DeleteActivityService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(activityId: string, requesterId: string): Promise<void> {
    const activity = await this.activitiesRepository.findBy('id', activityId, [
      'requester',
    ]);

    if (!activity) {
      throw new AppError('Invalid data to delete activity!');
    }

    if (activity.requester.id !== requesterId) {
      throw new AppError('Just requester can delete the activity!');
    }

    try {
      await this.activitiesRepository.delete(activity);
    } catch (err) {
      throw new AppError('Failed to delete activity!');
    }
  }
}

export default DeleteActivityService;
