import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrganizationProfile } from "./OrganizationProfile";
import { ExternalRole } from "./ExternalRole";




@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  memberId!: string;

  @ManyToOne(() => OrganizationProfile, (orgProfile) => orgProfile.members)
  organization!: OrganizationProfile;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @ManyToOne(() => ExternalRole, (role) => role.members)
  role!: ExternalRole;
}