import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';
import ICreateActivityDTO from '@modules/activities/dtos/ICreateActivityDTO';

import Activity from '@modules/activities/infra/typeorm/entities/Activity';
import User from '@modules/users/infra/typeorm/entities/User';

import { v4 as uuid } from 'uuid';
import IUpdateActivityDTO from '@modules/activities/dtos/IUpdateActivityDTO';
import removeUndefined from '@shared/infra/http/utils/removeUndefined';

const date = new Date();

class FakeActivitiesRepository implements IActivitiesRepository {
  private activities: Activity[] = [];

  public async create(data: ICreateActivityDTO): Promise<Activity> {
    const activity = new Activity();

    const requester = { id: data.requester };
    const responsibles = data.responsibles.map((responsible) => ({
      id: responsible,
    }));

    Object.assign(activity, {
      id: uuid(),
      ...data,
      requester,
      responsibles,
      created_at: date,
      updated_at: date,
    });

    this.activities.push(activity);

    return activity;
  }

  public async update(
    activity: Activity,
    activityData: IUpdateActivityDTO,
  ): Promise<Activity> {
    const index = this.activities.findIndex(
      (current) => current.id === activity.id,
    );

    removeUndefined(activityData);

    const updatedActivity = new Activity();

    Object.assign(updatedActivity, {
      ...activity,
      ...activityData,
    });

    this.activities[index] = updatedActivity;

    return updatedActivity;
  }

  public async delete(activity: Activity): Promise<void> {
    const index = this.activities.findIndex(
      (current) => current.id === activity.id,
    );

    this.activities.splice(index, 1);
  }

  public async findAll(): Promise<Activity[]> {
    return this.activities;
  }

  public async findUserActivities(userId: string): Promise<Activity[]> {
    const findUsers = (responsibles: User[], id: string) => {
      const user = responsibles.filter(
        (responsible: User) => responsible.id === id,
      );
      return user.length > 0;
    };

    return this.activities.filter(
      (activity: Activity) => activity.requester.id === userId
        || findUsers(activity.responsibles, userId),
    );
  }

  public async findBy(
    field: keyof Activity,
    value: string,
  ): Promise<Activity | undefined> {
    const findActivity = this.activities.find((city) => city[field] === value);

    return findActivity;
  }
}

export default FakeActivitiesRepository;
