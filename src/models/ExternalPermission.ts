import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExternalRole } from "./ExternalRole";



@Entity()
export class ExternalPermission {
  @PrimaryGeneratedColumn('uuid')
  extPerId!: string;

  @Column({ unique: true })
  permissionName!: string;

  @ManyToMany(() => ExternalRole, (role) => role.permissions)
  roles!: ExternalRole[];
}
