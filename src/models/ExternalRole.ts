import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./Member";
import { ExternalPermission } from "./ExternalPermission";




@Entity()
export class ExternalRole {
  @PrimaryGeneratedColumn('uuid')
  perId!: string;

  @Column({ unique: true })
  roleName!: string;

  @OneToMany(() => Member, (member) => member.role)
  members!: Member[];

  @ManyToMany(() => ExternalPermission, (permission) => permission.roles)
  @JoinTable()
  permissions!: ExternalPermission[];
}
