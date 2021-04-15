import Sub_Activity from '@modules/activities/infra/typeorm/entities/Sub_Activity';

import ICreateSub_ActivityDTO from '../dtos/ICreateSub_ActivityDTO';

export default interface IActivitiesRepository {
  create(
    activityData: ICreateSub_ActivityDTO,
    userId: string
  ): Promise<Sub_Activity>;
};
