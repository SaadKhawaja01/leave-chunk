import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Leave extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  toDate: Date;

  @Column()
  fromDate: Date;

  @Column()
  leaveType: string;

  @Column()
  descriptionLeave: string;


  @Column()
  reason: string;
}
