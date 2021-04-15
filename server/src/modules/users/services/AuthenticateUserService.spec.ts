import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
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

    const response = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'john@contact.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUserRepository.create({
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
      authenticateUser.execute({
        email: user.email,
        password: `${user.password}wrong`,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
