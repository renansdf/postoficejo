import MailProvider from '../providers/MailProvider/MailProvider';
import path from 'path';

import IMailProvider from '../providers/MailProvider/IMailProvider';
import IContactRequest from '../routes/contact/IContactRequest';

export default class SendContactEmailService {
  private mailProvider: IMailProvider;

  constructor() {
    this.mailProvider = new MailProvider();
  }

  public async execute({
    name,
    email,
    company,
    message,
    phone,
    attachments,
    formName
  }: IContactRequest): Promise<void> {
    const contactTemplate = path.resolve(__dirname, '..', 'providers', 'MailTemplateProvider', 'views', 'contact.hbs');
    const contactCustomerTemplate = path.resolve(__dirname, '..', 'providers', 'MailTemplateProvider', 'views', 'contactCustomer.hbs');

    await this.mailProvider.sendEmail({
      to: {
        name: name,
        email: email,
      },
      subject: `Konekto | agradecemos sua mensagem`,
      templateData: {
        file: contactCustomerTemplate,
        variables: {
          name
        }
      }
    });

    await this.mailProvider.sendEmail({
      to: {
        name: 'Konekters',
        email: process.env.DEFAULT_TO_EMAIL ||= 'renan@konekto.me',
      },
      subject: `Konekto | ${formName}`,
      templateData: {
        file: contactTemplate,
        variables: {
          name,
          email,
          phone,
          company,
          message,
          attachments,
          formName
        }
      }
    });

  }
}