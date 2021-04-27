import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateSub_ActivityService from '@modules/activities/services/CreateSub_ActivityService';
import DeleteSub_ActivityService from '@modules/activities/services/DeleteSub_ActivityService';

class Sub_ActivitiesController {
  public async create(request: Request, response: Response) {
    const createSub_ActivityService = container.resolve(
      CreateSub_ActivityService,
    );

    const user = request.user.id;

    const sub_activityData = request.body;

    const sub_activity = await createSub_ActivityService.execute(
      sub_activityData,
      user,
    );

    return response.json(sub_activity);
  }

  public async delete(request: Request, response: Response) {
    const deleteSub_Activity = container.resolve(DeleteSub_ActivityService);

    const { id } = request.params;

    const user = request.user.id;

    await deleteSub_Activity.execute(id, user);

    return response.sendStatus(204);
  }
}

export default Sub_ActivitiesController;
