import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Allowed extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  leaveType: string;
  @Column()
  allowedLeaves: number;
  @Column()
  consumedLaves: number;
  @Column()
  remainingLeaves: number;

}
