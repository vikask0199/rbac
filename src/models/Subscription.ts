import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalUser } from "./ExternalUser";
import { Contract } from "./Contract";



@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  subId!: string;

  @Column()
  planName!: string;

  @Column()
  price!: string;

  @Column()
  viewerLimit!: number;

  @Column()
  validity!: number;

  @Column({ default: false })
  isActive!: boolean;

  @Column({ type: 'date' })
  validTill!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => ExternalUser, (user) => user.subscriptions, { nullable: true })
  user!: ExternalUser;  // Association with user

  @ManyToOne(() => Contract, (contract) => contract.subscriptions, { nullable: true })
  contract!: Contract;  // Association with contract
}