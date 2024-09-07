import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class SubscriptionHistory {
    
  @PrimaryGeneratedColumn('uuid')
  subHisId!: string;

  @Column()
  contractId!: string;

  @Column({ type: 'jsonb' })
  subscriptionDetails: any;

  @CreateDateColumn()
  createdAt!: Date; 
  
}