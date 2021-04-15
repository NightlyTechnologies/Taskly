import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
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
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUserService.execute({
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
    });

    await expect(
      createUserService.execute({
        name: 'John',
        email: 'john@contact.com',
        password: '123456',
        phone: '12345678911',
        city: 'Dionísio Cerqueira',
        uf: 'SC',
        address: 'address',
        avatar_url: 'image',
        cpf: '11111111111',
        rg: '1111111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two users with the same cpf', async () => {
    await createUserService.execute({
      name: 'John',
      email: 'john1@contact.com',
      password: '123456',
      phone: '12345678911',
      city: 'Dionísio Cerqueira',
      uf: 'SC',
      address: 'address',
      avatar_url: 'image',
      cpf: '11111111111',
      rg: '0000000000',
    });

    await expect(
      createUserService.execute({
        name: 'John',
        email: 'john2@contact.com',
        password: '123456',
        phone: '12345678911',
        city: 'Dionísio Cerqueira',
        uf: 'SC',
        address: 'address',
        avatar_url: 'image',
        cpf: '11111111111',
        rg: '1111111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two users with the same rg', async () => {
    await createUserService.execute({
      name: 'John',
      email: 'john1@contact.com',
      password: '123456',
      phone: '12345678911',
      city: 'Dionísio Cerqueira',
      uf: 'SC',
      address: 'address',
      avatar_url: 'image',
      cpf: '00000000000',
      rg: '0000000000',
    });

    await expect(
      createUserService.execute({
        name: 'John',
        email: 'john2@contact.com',
        password: '123456',
        phone: '12345678911',
        city: 'Dionísio Cerqueira',
        uf: 'SC',
        address: 'address',
        avatar_url: 'image',
        cpf: '11111111111',
        rg: '0000000000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
