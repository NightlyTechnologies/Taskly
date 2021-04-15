import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';

@injectable()
class ListAllActivitiesService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute() {
    const activities = await this.activitiesRepository.findAll();

    return activities;
  }
}

export default ListAllActivitiesService;
