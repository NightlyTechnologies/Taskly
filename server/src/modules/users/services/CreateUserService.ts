import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
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
    const emailUsed = await this.usersRepository.findBy('email', email);

    if (emailUsed) {
      throw new AppError('Email address already used');
    }

    const cpfUsed = await this.usersRepository.findBy('cpf', cpf);

    if (cpfUsed) {
      throw new AppError('CPF already used');
    }

    const rgUsed = await this.usersRepository.findBy('rg', rg);

    if (rgUsed) {
      throw new AppError('RG already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
      cpf,
      rg,
      avatar_url,
      city,
      uf,
      address,
    });

    return user;
  }
}

export default CreateUserService;
