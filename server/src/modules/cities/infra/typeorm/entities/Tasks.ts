import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  audit1: boolean;

  @Column()
  audit2: boolean;

  @Column()
  audit3: boolean;

  @Column()
  audit4: boolean;

  @Column()
  audit5: boolean;

  @Column()
  cafirs: boolean;

  @Column()
  diffs: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tasks;
