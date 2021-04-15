import IActivitiesRepository from '@modules/activities/repositories/IActivitiesRepository';
import ICreateActivityDTO from '@modules/activities/dtos/ICreateActivityDTO';

import CreateActivityService from '@modules/activities/services/CreateActivityService';
import FakeActivitiesRepository from '@modules/activities/repositories/fakes/FakeActivitiesRepository';

import AppError from '@shared/errors/AppError';

let fakeActivitiesRepository: IActivitiesRepository;
let createActivityService: CreateActivityService;

describe('CreateActivity', () => {
  beforeEach(() => {
    fakeActivitiesRepository = new FakeActivitiesRepository();
    createActivityService = new CreateActivityService(fakeActivitiesRepository);
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

  it('should be able to create a new activity', async () => {
    const actvityInstance = await createActivityService.execute(activity);

    expect(actvityInstance).toHaveProperty('id');
  });

  it('should not be able to create a activity with a past deadline', async () => {
    await expect(
      createActivityService.execute({
        ...activity,
        deadline: new Date('9/9/2009'),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to handle with database erros', async () => {
    jest
      .spyOn(fakeActivitiesRepository, 'create')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    await expect(
      createActivityService.execute(activity),
    ).rejects.toBeInstanceOf(AppError);
  });
});
