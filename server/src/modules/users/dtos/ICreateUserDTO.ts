export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  rg: string;
  avatar_url?: string;
  city: string;
  uf: string;
  address: string;
}
