import {
  Agreement,
  ContractType,
} from '@modules/cities/infra/typeorm/entities/City';

import {
  IMayor, ITax, ISupervisor, IVtn, ITasks,
} from './ICityDTO';

export default interface ICreateUserDTO {
  id: string;
  avatar_url?: string;
  name?: string;
  uf?: string;
  begin_validity?: Date;
  final_validity?: Date;
  contract_type?: ContractType;
  contract_value?: number;
  agreement?: Agreement;
  mayor?: IMayor;
  tax_responsible?: ITax;
  supervisor1?: ISupervisor;
  supervisor2?: ISupervisor;
  vtn1?: IVtn;
  vtn2?: IVtn;
  vtn3?: IVtn;
  vtn4?: IVtn;
  vtn5?: IVtn;
  tasks?: ITasks;
}
