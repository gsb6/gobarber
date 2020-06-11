import IParseMailTemplateDTO from '@shared/providers/mailTemplate/dtos/IParseMailTemplate';

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
