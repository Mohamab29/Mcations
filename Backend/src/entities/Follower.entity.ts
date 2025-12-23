import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';
import { Vacation } from './Vacation.entity';

@Entity('followers')
export class Follower {
  @PrimaryColumn('varchar', { length: 36 })
  userId!: string;

  @PrimaryColumn('varchar', { length: 36 })
  vacationId!: string;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Vacation, (vacation) => vacation.followers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'vacationId' })
  vacation!: Vacation;
}