import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';
import ICreateActivityDTO from '@modules/activities/dtos/ICreateActivityDTO';

import ListUserActivitiesService from '@modules/activities/services/ListUserActivitiesService';
import FakeActivitiesRepository from '@modules/activities/repositories/fakes/FakeActivitiesRepository';

let fakeActivitiesRepository: IActivitiesRepository;
let listUserActivitiesService: ListUserActivitiesService;

describe('ListUserActivities', () => {
  beforeEach(() => {
    fakeActivitiesRepository = new FakeActivitiesRepository();
    listUserActivitiesService = new ListUserActivitiesService(
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

  it('should be able to list user activities when he is the requester', async () => {
    const userId = 'f5fdaec3-7b16-4b34-acef-528c1e3d3990';
    await fakeActivitiesRepository.create(activity);
    const userActivity = await fakeActivitiesRepository.create({
      ...activity,
      requester: userId,
    });

    const userActivities = await listUserActivitiesService.execute(userId);

    expect(userActivities).toStrictEqual([userActivity]);
  });

  it('should be able to list user activities when he is the requester', async () => {
    const userId = 'f5fdaec3-7b16-4b34-acef-528c1e3d3990';
    await fakeActivitiesRepository.create(activity);
    const userActivity = await fakeActivitiesRepository.create({
      ...activity,
      responsibles: [userId],
    });

    const userActivities = await listUserActivitiesService.execute(userId);

    expect(userActivities).toStrictEqual([userActivity]);
  });
});
