interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'email@dominioproprio.com.br',
      name: 'Nome do asuário aqui',
    },
  },
} as IMailConfig;
