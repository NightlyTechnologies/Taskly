type Agreement =
  | 'ok'
  | 'nonexistent'
  | 'denounced'
  | 'unable_worker'
  | 'unpublished';

type AgreementText = (agreement: Agreement) => string;

const agreementText: AgreementText = agreement => {
  switch (agreement) {
    case 'denounced':
      return 'Denunciado';

    case 'nonexistent':
      return 'Inexistente';

    case 'ok':
      return 'Ok';

    case 'unable_worker':
      return 'Servidor não habilitado';

    default:
      return 'Assinado não publicado';
  }
};

export default agreementText;
