import { container } from 'tsyringe';

import IStorageProvider from './storage/models/IStorageProvider';
import DiskStorageProvider from './storage/implementation/DiskStorage';

import IMailProvider from './mail/models/IMailProvider';
import EtherealMailProvider from './mail/implementation/Ethereal';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
