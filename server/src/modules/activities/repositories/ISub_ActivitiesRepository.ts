import Sub_Activity from '@modules/activities/infra/typeorm/entities/Sub_Activity';

import ICreateSub_ActivityDTO from '@modules/activities/dtos/ICreateSub_ActivityDTO';
import IUpdateSub_ActivityDTO from '@modules/activities/dtos/IUpdateSub_ActivityDTO';

export default interface ISub_ActivitiesRepository {
  create(
    sub_activityData: ICreateSub_ActivityDTO,
    userId: string
  ): Promise<Sub_Activity>;
  delete(sub_activity: Sub_Activity): Promise<void>;
  update(
    sub_activity: Sub_Activity,
    sub_activityData: IUpdateSub_ActivityDTO
  ): Promise<Sub_Activity>;
  findBy(
    field: keyof Sub_Activity,
    value: string,
    relations?: string[]
  ): Promise<Sub_Activity | undefined>;
};
