import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import UpdateUserService from '@modules/users/services/UpdateUserService';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserService: UpdateUserService;

describe('UpdateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserService = new UpdateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  const initialUser: ICreateUserDTO = {
    name: 'John',
    email: 'john@contact.com',
    password: '123456',
    phone: '12345678911',
    city: 'Dionísio Cerqueira',
    uf: 'SC',
    address: 'address',
    avatar_url: 'image',
    cpf: '00000000000',
    rg: '0000000000',
  };

  it('should be able to change user email', async () => {
    const user = await fakeUserRepository.create(initialUser);

    const newEmail = 'another@gmail.com';

    const updatedUser = await updateUserService.execute({
      ...user,
      email: newEmail,
    });

    delete updatedUser.created_at;
    delete updatedUser.updated_at;
    delete updatedUser.getAvatarUrl;

    updatedUser.avatar_url = user.avatar_url;

    expect(updatedUser.email).toBe(newEmail);
    expect({ ...updatedUser, email: user.email }).toEqual({ ...user });
  });

  it('should not be able to change user email to an invalid email', async () => {
    const user = await fakeUserRepository.create(initialUser);

    const newEmail = 'another@gmail.com';

    await fakeUserRepository.create({
      name: 'john',
      email: newEmail,
      password: '123456',
      phone: '12345678911',
      city: 'dionísio cerqueira',
      uf: 'sc',
      address: 'address',
      avatar_url: 'image',
      cpf: initialUser.cpf + 1,
      rg: initialUser.rg + 1,
    });

    delete user.password;

    expect(
      updateUserService.execute({
        ...user,
        email: newEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change user cpf to an invalid cpf', async () => {
    const user = await fakeUserRepository.create(initialUser);

    const newCpf = user.cpf + 1;

    await fakeUserRepository.create({
      name: 'john',
      email: `${initialUser.email}a`,
      password: '123456',
      phone: '12345678911',
      city: 'dionísio cerqueira',
      uf: 'sc',
      address: 'address',
      avatar_url: 'image',
      cpf: newCpf,
      rg: initialUser.rg + 1,
    });

    delete user.password;

    expect(
      updateUserService.execute({
        ...user,
        cpf: newCpf,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change user rg to an invalid rg', async () => {
    const user = await fakeUserRepository.create(initialUser);

    const newRg = user.rg + 1;

    await fakeUserRepository.create({
      name: 'john',
      email: `${initialUser.email}a`,
      password: '123456',
      phone: '12345678911',
      city: 'dionísio cerqueira',
      uf: 'sc',
      address: 'address',
      avatar_url: 'image',
      cpf: initialUser.cpf + 1,
      rg: newRg,
    });

    delete user.password;

    expect(
      updateUserService.execute({
        ...user,
        rg: newRg,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change user name', async () => {
    const user = await fakeUserRepository.create(initialUser);

    const newName = 'AnotherName';

    const updatedUser = await updateUserService.execute({
      ...user,
      name: newName,
    });

    delete updatedUser.created_at;
    delete updatedUser.updated_at;
    delete updatedUser.getAvatarUrl;

    updatedUser.avatar_url = user.avatar_url;

    expect(updatedUser.name).toBe(newName);
    expect({ ...updatedUser, name: user.name }).toEqual({ ...user });
  });

  it('should be able to change entirely data', async () => {
    const user = await fakeUserRepository.create(initialUser);

    delete user.password;

    const newData: IUpdateUserDTO = {
      id: user.id,
      name: 'john',
      email: `${initialUser.email}a`,
      password: '123456',
      phone: '12345678911',
      city: 'dionísio cerqueira',
      uf: 'sc',
      address: 'address',
      avatar_url: 'image',
      cpf: initialUser.cpf + 1,
      rg: initialUser.rg + 1,
    };

    const updatedUser = await updateUserService.execute(newData);

    delete updatedUser.created_at;
    delete updatedUser.updated_at;
    delete updatedUser.getAvatarUrl;

    updatedUser.avatar_url = user.avatar_url;

    expect(updatedUser).toEqual(newData);
  });

  it('should be able to handle with nonexistent user', async () => {
    await expect(
      updateUserService.execute({
        id: '1',
        name: 'john',
        email: `${initialUser.email}a`,
        password: '123456',
        phone: '12345678911',
        city: 'dionísio cerqueira',
        uf: 'sc',
        address: 'address',
        avatar_url: 'image',
        cpf: initialUser.cpf + 1,
        rg: initialUser.rg + 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to handle with database errors', async () => {
    jest.spyOn(fakeUserRepository, 'update').mockImplementationOnce(() => {
      throw new Error();
    });

    const user = await fakeUserRepository.create(initialUser);

    delete user.password;

    expect(updateUserService.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
