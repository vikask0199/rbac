import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subscription } from "./Subscription";
import { ExternalUser } from "./ExternalUser";
import { Member } from "./Member";
import { OrganizationProfile } from "./OrganizationProfile";




@Entity()
export class Contract {

  @PrimaryGeneratedColumn('uuid')
  conId!: string;

  @Column({ unique: true })
  contractId!: string;

  @OneToOne(() => ExternalUser, (user) => user.contract)
  user!: ExternalUser;

  @OneToMany(() => Subscription, (subscription) => subscription.contract)
  subscriptions!: Subscription[];

  @OneToOne(() => OrganizationProfile, (orgProfile) => orgProfile.contract)
  organizationProfile!: OrganizationProfile | null;

}
