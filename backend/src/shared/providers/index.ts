import IStorageProvider from './storage/models/IStorageProvider';
import DiskStorageProvider from './storage/implementation/DiskStorage';
import { container } from 'tsyringe';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
