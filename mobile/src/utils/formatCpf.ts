type FormatCpf = (cpf: string) => string;

const formatCpf: FormatCpf = cpf => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export default formatCpf;
