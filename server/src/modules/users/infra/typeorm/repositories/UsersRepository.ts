import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User, process.env.CONNECTION_NAME);
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    await this.ormRepository.save(user);

    const updatedUser = await this.findBy('id', user.id);

    if (!updatedUser) {
      throw new Error();
    }

    return updatedUser;
  }

  public async findBy(
    field: keyof User,
    value: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        [field]: value,
      },
    });

    return user;
  }
}

export default UsersRepository;
