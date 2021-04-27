import Sub_Activity from '@modules/activities/infra/typeorm/entities/Sub_Activity';

import ICreateSub_ActivityDTO from '../dtos/ICreateSub_ActivityDTO';

export default interface ISub_ActivitiesRepository {
  create(
    activityData: ICreateSub_ActivityDTO,
    userId: string
  ): Promise<Sub_Activity>;
  delete(activity: Sub_Activity): Promise<void>;
  findBy(
    field: keyof Sub_Activity,
    value: string,
    relations?: string[]
  ): Promise<Sub_Activity | undefined>;
};
