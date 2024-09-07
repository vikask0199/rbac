import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalPermission } from "./ExternalPermission";
import { OrgProfile } from "./OrgProfile";


@Entity()
export class ExternalRole {
    @PrimaryGeneratedColumn("uuid")
    public externalRoleId!: string;

    @Column({ unique: true, nullable: false })
    public externalRoleName!: string;

    @ManyToMany(() => ExternalPermission, (permission) => permission.roles, {
        cascade: true,
        eager: true,
    })
    @JoinTable({
        name: "external_roles_permissions",
        joinColumns: [{ name: "externalRoleId" }],
        inverseJoinColumns: [{ name: "externalPermissionId" }],
    })
    public permissions?: ExternalPermission[];

    @ManyToOne(() => OrgProfile, (orgProfile) => orgProfile.members, { nullable: true, onDelete: 'SET NULL' })
    public organization!: OrgProfile | null;
}