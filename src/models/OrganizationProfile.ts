import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalUser } from "./ExternalUser";
import { Member } from "./Member";
import { Contract } from "./Contract";



@Entity()
export class OrganizationProfile {

  @PrimaryGeneratedColumn('uuid')
  orgId!: string;

  @Column()
  organizationName!: string;

  @Column()
  address!: string;

  @OneToOne(() => Contract, (contract) => contract.organizationProfile)
  contract!: Contract;

  @OneToMany(() => Member, (member) => member.organization)
  members!: Member[];
}