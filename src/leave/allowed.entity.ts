import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Allowed extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  casualLeaves: string;

  @Column()
  compensatoryLeaves: string;

  @Column()
  earnedLeaves: string;
}
