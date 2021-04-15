export default interface IUpdateUserDTO {
  id: string;
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
