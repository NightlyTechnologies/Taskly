import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User[]> {
    const allUsers = await this.usersRepository.findAll();

    const users = allUsers.filter((user) => user.id !== id);

    return users;
  }
}

export default CreateUserService;
