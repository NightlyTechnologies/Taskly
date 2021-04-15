import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  RelationOptions,
  ManyToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Activity from './Activity';

const conf: RelationOptions = {
  eager: true,
  cascade: true,
  onDelete: 'CASCADE',
};

@Entity('notes')
class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, conf)
  @JoinColumn({
    name: 'author',
    referencedColumnName: 'id',
  })
  author: User;

  @Column()
  description: string;

  @ManyToOne(() => Activity, (activity) => activity.notes)
  activity: Activity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Note;
