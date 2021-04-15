import { Request, Response } from 'express';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import User from '../../typeorm/entities/User';

export default class AvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    let user = new User();

    const { id } = request.user;

    user = await updateUserAvatarService.execute({
      id,
      avatar: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
