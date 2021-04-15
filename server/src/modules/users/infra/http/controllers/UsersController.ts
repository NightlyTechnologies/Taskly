import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ListAllUsersService from '@modules/users/services/ListAllUsersService';

import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllUsersService = container.resolve(ListAllUsersService);

    const { id } = request.user;

    const users = await listAllUsersService.execute(id);

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);

    const userData = request.body;

    const user = await createUserService.execute(userData);

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserService = container.resolve(UpdateUserService);
    const { id } = request.user;

    const {
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
    } = request.body;

    const data: IUpdateUserDTO = {
      id,
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
    };

    const user = await updateUserService.execute(data);

    return response.json(classToClass(user));
  }
}

export default UsersController;
