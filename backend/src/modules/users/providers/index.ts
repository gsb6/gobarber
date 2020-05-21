import { container } from 'tsyringe';

import IHashProvider from './hash/models/IHashProvider';
import BCryptHashProvider from './hash/implementation/BCrypt';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
