import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contract } from "./Contract";
import { Subscription } from "./Subscription";


@Entity()
export class ExternalUser {

  @PrimaryGeneratedColumn('uuid')
  extUserId!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ type: 'enum', enum: ['individual', 'organization'], default: 'individual' })
  accountType!: 'individual' | 'organization';

  @OneToOne(() => Contract, (contract) => contract.user, { cascade: true })
  @JoinColumn()
  contract!: Contract;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  @JoinColumn()
  subscriptions!: Subscription[];


  @CreateDateColumn()
  createdAt!: Date;
}