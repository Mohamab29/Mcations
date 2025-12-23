import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Follower } from './Follower.entity';

@Entity('users')
export class User {
  @PrimaryColumn('varchar', { length: 36 })
  userId!: string;

  @Column({ type: 'varchar', length: 30 })
  firstName!: string;

  @Column({ type: 'varchar', length: 40 })
  lastName!: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 600, select: false })
  password!: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  isAdmin!: boolean;

  @OneToMany(() => Follower, (follower) => follower.user)
  followers!: Follower[];
}
