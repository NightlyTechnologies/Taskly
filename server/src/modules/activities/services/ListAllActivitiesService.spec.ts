import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';
import ICreateActivityDTO from '@modules/activities/dtos/ICreateActivityDTO';

import ListAllActivitiesService from '@modules/activities/services/ListAllActivitiesService';
import FakeActivitiesRepository from '@modules/activities/repositories/fakes/FakeActivitiesRepository';

import Activity from '../infra/typeorm/entities/Activity';

let fakeActivitiesRepository: IActivitiesRepository;
let listAllActivitiesService: ListAllActivitiesService;

describe('ListAllActivities', () => {
  beforeEach(() => {
    fakeActivitiesRepository = new FakeActivitiesRepository();
    listAllActivitiesService = new ListAllActivitiesService(
      fakeActivitiesRepository,
    );
  });

  const activity: ICreateActivityDTO = {
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
    deadline: new Date('11/13/2022'),
  };

  it('should be able to list all activities', async () => {
    const activity1 = await fakeActivitiesRepository.create(activity);
    const activity2 = await fakeActivitiesRepository.create(activity);

    const cleanActivities = (activities: Activity[]) => activities.map((activityEntry: Activity) => {
      const cleanActivity = activityEntry;

      delete cleanActivity.created_at;
      delete cleanActivity.updated_at;
      delete cleanActivity.id;

      return cleanActivity;
    });

    const activities = await listAllActivitiesService.execute();

    const readyActivities = cleanActivities(activities);
    const expectedActivities = cleanActivities([activity1, activity2]);

    expect(readyActivities).toStrictEqual(expectedActivities);
  });
});
