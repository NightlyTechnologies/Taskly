import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
  avatar: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, avatar }: IRequest): Promise<User> {
    const user = await this.usersRepository.findBy('id', id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar_url) {
      await this.storageProvider.deleteFile(user.avatar_url);
    }

    await this.storageProvider.saveFile(avatar);

    try {
      const updatedUser = await this.usersRepository.update({
        ...user,
        avatar_url: avatar,
      });

      return updatedUser;
    } catch {
      throw new AppError('Invalid data to update avatar');
    }
  }
}

export default UpdateUserAvatarService;
