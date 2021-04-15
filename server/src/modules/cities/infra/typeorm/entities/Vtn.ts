import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vtn')
class Vtn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  year: number;

  @Column()
  good: number;

  @Column()
  regular: number;

  @Column()
  restricted: number;

  @Column()
  planted: number;

  @Column()
  natural: number;

  @Column()
  preservation: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Vtn;
