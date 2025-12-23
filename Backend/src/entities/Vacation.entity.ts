import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Follower } from './Follower.entity';

@Entity('vacations')
export class Vacation {
  @PrimaryColumn('varchar', { length: 36 })
  vacationId!: string;

  @Column({ type: 'varchar', length: 1500 })
  description!: string;

  @Column({ type: 'varchar', length: 60 })
  destination!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @Column({ type: 'varchar', length: 41, nullable: true })
  imageName!: string | null;

  @OneToMany(() => Follower, (follower) => follower.vacation)
  followers!: Follower[];
}