import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import AvatarController from '@modules/users/infra/http/controllers/AvatarController';
import SessionController from '@modules/users/infra/http/controllers/SessionController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import { cpf, rg } from '@modules/users/infra/http/validators';
import phone from '@shared/infra/http/validators';

const router = Router();
const upload = multer(uploadConfig.multer);

const usersController = new UsersController();
const avatarController = new AvatarController();
const sessionController = new SessionController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(5),
      phone: phone.required(),
      cpf: cpf.required(),
      rg: rg.required(),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
      address: Joi.string().required(),
    },
  }),
  usersController.create,
);

router.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(5),
      phone,
      cpf,
      rg,
      city: Joi.string(),
      uf: Joi.string().length(2),
      address: Joi.string(),
    },
  }),
  usersController.update,
);

router.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(5),
    },
  }),
  sessionController.create,
);

router.get('/', ensureAuthenticated, usersController.index);

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('file'),
  avatarController.update,
);

export default router;
