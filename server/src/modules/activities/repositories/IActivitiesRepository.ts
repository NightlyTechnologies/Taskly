import Activity from '@modules/activities/infra/typeorm/entities/Activity';
import ICreateActivityDTO from '@modules/activities/dtos/ICreateActivityDTO';
import IUpdateActivityDTO from '../dtos/IUpdateActivityDTO';

export default interface IActivitiesRepository {
  create(activityData: ICreateActivityDTO): Promise<Activity>;
  update(
    activity: Activity,
    activityData: IUpdateActivityDTO
  ): Promise<Activity>;
  delete(activity: Activity): Promise<void>;
  findAll(): Promise<Activity[]>;
  findBy(
    field: keyof Activity,
    value: string,
    relations?: string[]
  ): Promise<Activity | undefined>;
  findUserActivities(userId: string): Promise<Activity[]>;
};
