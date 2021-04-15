import FakeActivitiesRepository from '@modules/activities/repositories/fakes/FakeActivitiesRepository';

import DeleteActivityService from '@modules/activities/services/DeleteActivityService';
import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';
import ICreateActivityDTO from '@modules/activities/dtos/ICreateActivityDTO';

let fakeActivitiesRepository: IActivitiesRepository;
let deleteActivityService: DeleteActivityService;

describe('DeleteActivityService', () => {
  beforeEach(() => {
    fakeActivitiesRepository = new FakeActivitiesRepository();
    deleteActivityService = new DeleteActivityService(fakeActivitiesRepository);
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
    deadline: new Date(),
  };

  it('should be able to delete an activity', async () => {
    const actvityInstance = await fakeActivitiesRepository.create(activity);

    await deleteActivityService.execute(actvityInstance.id, activity.requester);

    const activities = await fakeActivitiesRepository.findAll();

    expect(activities).toStrictEqual([]);
  });
});
