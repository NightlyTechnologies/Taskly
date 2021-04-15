import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IActivitiesRepository from '../repositories/IActivitiesRepository';

@injectable()
class ListUserActivitiesService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(userId: string) {
    const userActivities = await this.activitiesRepository.findUserActivities(
      userId,
    );

    return userActivities;
  }
}

export default ListUserActivitiesService;
