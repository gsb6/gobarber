import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/Ethereal';
import SESMailProvider from './implementations/SES';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
