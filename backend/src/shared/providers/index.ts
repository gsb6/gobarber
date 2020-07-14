import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IStorageProvider from './storage/models/IStorageProvider';
import DiskStorageProvider from './storage/implementation/DiskStorage';

import IMailProvider from './mail/models/IMailProvider';
import EtherealMailProvider from './mail/implementation/Ethereal';
import SESMailProvider from './mail/implementation/SES';

import IMailTemplateProvider from './mailTemplate/models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from './mailTemplate/implementation/HandleBarsMailTemplate';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandleBarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);
