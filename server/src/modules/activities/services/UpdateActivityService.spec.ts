import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';
import IUpdateActivityDTO from '@modules/activities/dtos/IUpdateActivityDTO';

import UpdateActivityService from '@modules/activities/services/UpdateActivityService';
import FakeActivitiesRepository from '@modules/activities/repositories/fakes/FakeActivitiesRepository';

import AppError from '@shared/errors/AppError';
import Activity from '../infra/typeorm/entities/Activity';

let fakeActivitiesRepository: IActivitiesRepository;
let updateActivityService: UpdateActivityService;
let activity: Activity;

describe('UpdateActivity', () => {
  beforeEach(async () => {
    fakeActivitiesRepository = new FakeActivitiesRepository();
    updateActivityService = new UpdateActivityService(fakeActivitiesRepository);
    activity = await fakeActivitiesRepository.create({
      title: 'SECOND',
      description: 'Second Actvity',
      requester: '3ce50ab2-cacc-48fe-8d0f-d1c0606403e4',
      responsibles: [
        '3ce50ab2-cacc-48fe-8d0f-d1c0606403e4',
        'ab47249d-0574-4e4d-a63c-0f9282c702f1',
      ],
      cities: [
        '8107b205-2085-4972-aa7e-34a287dc7cbd',
        'e0fdbe1d-5497-40a3-8f46-b5001e5a3f0b',
      ],
      deadline: new Date(),
    });
  });

  it('should be able to update activity title', async () => {
    const updateData: IUpdateActivityDTO = {
      id: activity.id,
      title: `${activity.title}title`,
    };

    const updatedActivity = await updateActivityService.execute(
      updateData,
      activity.requester.id,
    );

    const expectedActivity = new Activity();

    Object.assign(expectedActivity, { ...activity, ...updateData });

    delete expectedActivity.responsibles;
    delete expectedActivity.requester;
    delete expectedActivity.cities;

    expect(updatedActivity).toStrictEqual(expectedActivity);
  });

  it('should not be able to update activity with invalid deadline', async () => {
    const updateData: IUpdateActivityDTO = {
      id: activity.id,
      deadline: new Date('7-7-2002'),
    };

    await expect(
      updateActivityService.execute(updateData, activity.requester.id),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update activity without being the requester', async () => {
    const updateData: IUpdateActivityDTO = {
      id: activity.id,
      deadline: new Date('12/12/2002'),
    };

    await expect(
      updateActivityService.execute(
        updateData,
        'ab47249d-0574-4e4d-a63c-0f9282c702f1',
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
