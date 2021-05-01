import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateActivityService from '@modules/activities/services/CreateActivityService';
import UpdateActivityService from '@modules/activities/services/UpdateActivityService';
import DeleteActivityService from '@modules/activities/services/DeleteActivityService';
import ListAllActivitiesService from '@modules/activities/services/ListAllActivitiesService';
import ListUserActivitiesService from '@modules/activities/services/ListUserActivitiesService';

class ActivitiesController {
  public async create(request: Request, response: Response) {
    const createActivityService = container.resolve(CreateActivityService);

    const requester = request.user.id;

    const activityData = { ...request.body, requester };

    const activity = await createActivityService.execute(activityData);

    return response.json(activity);
  }

  public async delete(request: Request, response: Response) {
    const deleteActivityService = container.resolve(DeleteActivityService);

    const { id } = request.params;

    const requester = request.user.id;

    await deleteActivityService.execute(id, requester);

    return response.sendStatus(204);
  }

  public async update(request: Request, response: Response) {
    const updateActivityService = container.resolve(UpdateActivityService);

    const { id } = request.params;

    const activityData = request.body;

    const requester = request.user.id;

    const updatedActivity = await updateActivityService.execute(
      {
        id,
        ...activityData,
      },
      requester,
    );

    return response.json(updatedActivity);
  }

  public async index(request: Request, response: Response) {
    const listAllActivitiesService = container.resolve(
      ListAllActivitiesService,
    );

    const activities = await listAllActivitiesService.execute();

    return response.json(classToClass(activities));
  }

  public async userIndex(request: Request, response: Response) {
    const listUserActivitiesService = container.resolve(
      ListUserActivitiesService,
    );

    const userId = request.user.id;

    const activities = await listUserActivitiesService.execute(userId);

    return response.json(classToClass(activities));
  }
}

export default ActivitiesController;
