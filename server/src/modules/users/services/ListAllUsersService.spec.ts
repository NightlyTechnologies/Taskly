import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListAllUsersService from './ListAllUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listAllUsersService: ListAllUsersService;

describe('ListAllUsersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listAllUsersService = new ListAllUsersService(fakeUsersRepository);
  });

  const data = {
    password: '123456',
    phone: '12345678911',
    city: 'Dionísio Cerqueira',
    uf: 'SC',
    address: 'address',
    avatar_url: 'image',
  };

  it('should be able to list all users', async () => {
    const user1 = await fakeUsersRepository.create({
      ...data,
      name: 'User1',
      email: 'user1@contact.com',
      cpf: '11111111111',
      rg: '1111111111',
    });

    const user2 = await fakeUsersRepository.create({
      ...data,
      name: 'User2',
      email: 'user2@contact.com',
      cpf: '22222222222',
      rg: '2222222222',
    });

    const user3 = await fakeUsersRepository.create({
      ...data,
      name: 'user3',
      email: 'user3@contact.com',
      cpf: '33333333333',
      rg: '3333333333',
    });

    const users = await listAllUsersService.execute(user1.id);

    expect(users).toEqual([user2, user3]);
  });
});
