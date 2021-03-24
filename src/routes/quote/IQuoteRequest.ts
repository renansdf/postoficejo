export default interface IQuoteRequest {
  name: string;
  email: string;
  service: string;
  company: string;
  date: string;
  deadline: string;
  cost: string;
  languageFrom: string;
  languageTo: string;
  quoteUrl: string;
  attachments: {
    filename: string;
    content: string | Buffer;
  }[];
}