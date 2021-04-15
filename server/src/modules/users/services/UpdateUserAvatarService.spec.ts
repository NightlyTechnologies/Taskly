import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatarService: UpdateUserAvatarService;
let fakeStorageProvider: FakeStorageProvider;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const avatar = 'idk.jpg';

    const { id } = await fakeUsersRepository.create({
      name: 'User1',
      password: '123456',
      phone: '12345678911',
      email: 'user1@contact.com',
      cpf: '11111111111',
      rg: '1111111111',
      city: 'whatever',
      uf: 'WH',
      address: 'user1',
    });

    const { avatar_url } = await updateUserAvatarService.execute({
      id,
      avatar,
    });

    expect(avatar_url).toBe(avatar);
  });

  it('should not be able to update invalid user', async () => {
    const avatar = 'idk.jpg';
    const id = '1234';

    expect(
      updateUserAvatarService.execute({ id, avatar }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when update a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const { id } = await fakeUsersRepository.create({
      name: 'User1',
      password: '123456',
      phone: '12345678911',
      email: 'user1@contact.com',
      cpf: '11111111111',
      rg: '1111111111',
      city: 'whatever',
      uf: 'WH',
      address: 'user1',
    });

    await updateUserAvatarService.execute({
      id,
      avatar: 'avatar1.jpg',
    });

    const { avatar_url } = await updateUserAvatarService.execute({
      id,
      avatar: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar1.jpg');
    expect(avatar_url).toBe('avatar2.jpg');
  });

  it('should be able to handle with database errors', async () => {
    jest.spyOn(fakeUsersRepository, 'update').mockImplementationOnce(() => {
      throw new Error();
    });

    const avatar = 'idk.jpg';

    const { id } = await fakeUsersRepository.create({
      name: 'User1',
      password: '123456',
      phone: '12345678911',
      email: 'user1@contact.com',
      cpf: '11111111111',
      rg: '1111111111',
      city: 'whatever',
      uf: 'WH',
      address: 'user1',
    });

    expect(
      updateUserAvatarService.execute({ id, avatar }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
