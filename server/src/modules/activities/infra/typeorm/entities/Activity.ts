import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  RelationOptions,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import City from '@modules/cities/infra/typeorm/entities/City';
import Note from '@modules/activities/infra/typeorm/entities/Note';
import Sub_Activity from '@modules/activities/infra/typeorm/entities/Sub_Activity';

export enum Status {
  REQUESTED = 'requested',
  PENDING = 'pending',
  FINISHED = 'finished',
}

const relationConf: RelationOptions = {
  cascade: true,
};

@Entity('activities')
class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToOne(() => User, relationConf)
  @JoinColumn({
    name: 'requesterId',
    referencedColumnName: 'id',
  })
  requester: User;

  @ManyToMany(() => User, relationConf)
  @JoinTable()
  responsibles: User[];

  @ManyToMany(() => City, relationConf)
  @JoinTable()
  cities: City[];

  @Column()
  deadline: Date;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;

  @OneToMany(() => Note, (note) => note.activity)
  notes: Note[];

  @OneToMany(() => Sub_Activity, (sub_activity) => sub_activity.activity)
  sub_activities: Sub_Activity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Activity;
