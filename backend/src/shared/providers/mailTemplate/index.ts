import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from './implementation/HandleBarsMailTemplate';

const providers = {
  handlebars: HandleBarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
