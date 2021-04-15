import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import Argon2HashProvider from './HashProvider/implementations/Argon2HashProvider';

container.registerSingleton<IHashProvider>('HashProvider', Argon2HashProvider);
