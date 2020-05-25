import { container } from 'tsyringe';

import IStorageProvider from './storage/models/IStorageProvider';
import DiskStorageProvider from './storage/implementation/DiskStorage';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
