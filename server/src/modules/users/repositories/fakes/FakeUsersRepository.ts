import { v4 as uuidv4 } from 'uuid';

import UsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements UsersRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
    phone,
    cpf,
    rg,
    avatar_url,
    city,
    uf,
    address,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuidv4(),
      name,
      email,
      password,
      phone,
      cpf,
      rg,
      avatar_url,
      city,
      uf,
      address,
    });

    this.users.push(user);

    return user;
  }

  public async update(data: IUpdateUserDTO): Promise<User> {
    const user = await this.findBy('id', data.id);

    if (!user) {
      throw new Error();
    }

    const updatedUser: User = {
      ...user,
      ...data,
      getAvatarUrl: () => '' || null,
    };

    const index = this.users.findIndex(({ id }) => id === user.id);

    this.users[index] = updatedUser;

    return updatedUser;
  }

  public async findBy(
    field: keyof User,
    value: string,
  ): Promise<User | undefined> {
    const findUser = this.users.find((user) => user[field] === value);

    return findUser;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }
}

export default FakeUsersRepository;
