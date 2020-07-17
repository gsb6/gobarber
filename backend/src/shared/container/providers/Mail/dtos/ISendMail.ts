import IParseMailTemplateDTO from '@shared/container/providers/MailTemplate/dtos/IParseMailTemplate';

interface IContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IContact;
  from?: IContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
