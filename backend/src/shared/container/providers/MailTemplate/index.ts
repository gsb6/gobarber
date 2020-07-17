import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from './implementations/HandleBarsMailTemplate';

const providers = {
  handlebars: HandleBarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
