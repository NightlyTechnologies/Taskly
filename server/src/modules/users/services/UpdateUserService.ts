import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
    phone,
    cpf,
    rg,
    city,
    uf,
    address,
  }: IUpdateUserDTO): Promise<User> {
    const exists = await this.usersRepository.findBy('id', id);

    if (!exists) {
      throw new AppError('User not found');
    }

    const emailUsed = await this.usersRepository.findBy('email', email);

    if (emailUsed && emailUsed.id !== id) {
      throw new AppError('Email address already used.');
    }

    const cpfUsed = await this.usersRepository.findBy('cpf', cpf);

    if (cpfUsed && cpfUsed.id !== id) {
      throw new AppError('CPF address already used.');
    }

    const rgUsed = await this.usersRepository.findBy('rg', rg);

    if (rgUsed && rgUsed.id !== id) {
      throw new AppError('RG address already used.');
    }

    let hashedPassword = password;

    if (password) {
      hashedPassword = await this.hashProvider.generateHash(password);
    }

    try {
      const user = await this.usersRepository.update({
        id,
        name,
        email,
        password: hashedPassword,
        phone,
        cpf,
        rg,
        city,
        uf,
        address,
      });

      return user;
    } catch {
      throw new AppError('Invalid data to update');
    }
  }
}

export default UpdateUserService;
