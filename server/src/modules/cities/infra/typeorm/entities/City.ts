import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  RelationOptions,
} from 'typeorm';

import Mayor from './Mayor';
import Supervisor from './Supervisor';
import Tax from './Tax';
import Tasks from './Tasks';
import Vtn from './Vtn';

export enum ContractType {
  ONLINE = 'online',
  PRESENTIAL = 'presential',
}

export enum Agreement {
  OK = 'ok',
  NONEXISTENT = 'nonexistent',
  DENOUNCED = 'denounced',
  UNABLE_WORKER = 'unable_worker',
  UNPUBLISHED = 'unpublished',
}

const conf: RelationOptions = {
  eager: true,
  cascade: true,
  onDelete: 'CASCADE',
};

@Entity('cities')
class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatar_url: string;

  @Column()
  name: string;

  @Column()
  uf: string;

  @Column({
    nullable: true,
  })
  begin_validity: Date;

  @Column({
    nullable: true,
  })
  final_validity: Date;

  @Column({
    type: 'enum',
    enum: ContractType,
  })
  contract_type: ContractType;

  @Column({
    nullable: true,
  })
  contract_value: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Agreement,
  })
  agreement: Agreement;

  @OneToOne(() => Mayor, conf)
  @JoinColumn({
    name: 'mayorId',
    referencedColumnName: 'id',
  })
  mayor: Mayor;

  @OneToOne(() => Tax, { ...conf, nullable: true })
  @JoinColumn({
    name: 'taxResponsibleId',
    referencedColumnName: 'id',
  })
  tax_responsible: Tax;

  @OneToOne(() => Supervisor, { ...conf, nullable: true })
  @JoinColumn({
    name: 'supervisor1Id',
    referencedColumnName: 'id',
  })
  supervisor1: Supervisor;

  @OneToOne(() => Supervisor, { ...conf, nullable: true })
  @JoinColumn({
    name: 'supervisor2Id',
    referencedColumnName: 'id',
  })
  supervisor2: Supervisor;

  @OneToOne(() => Vtn, conf)
  @JoinColumn({
    name: 'vtn1Id',
    referencedColumnName: 'id',
  })
  vtn1: Vtn;

  @OneToOne(() => Vtn, conf)
  @JoinColumn({
    name: 'vtn2Id',
    referencedColumnName: 'id',
  })
  vtn2: Vtn;

  @OneToOne(() => Vtn, conf)
  @JoinColumn({
    name: 'vtn3Id',
    referencedColumnName: 'id',
  })
  vtn3: Vtn;

  @OneToOne(() => Vtn, conf)
  @JoinColumn({
    name: 'vtn4Id',
    referencedColumnName: 'id',
  })
  vtn4: Vtn;

  @OneToOne(() => Vtn, conf)
  @JoinColumn({
    name: 'vtn5Id',
    referencedColumnName: 'id',
  })
  vtn5: Vtn;

  @OneToOne(() => Tasks, conf)
  @JoinColumn({
    name: 'tasksId',
    referencedColumnName: 'id',
  })
  tasks: Tasks;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default City;
