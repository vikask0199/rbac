import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalRoute } from "./ExternalRoutes";
import { ExternalRole } from "./ExternalRole";


@Entity()
export class ExternalPermission {
    
    @PrimaryGeneratedColumn("uuid")
    public externalPermissionId!: string;

    @Column({ unique: true, nullable: false })
    public externalPermissionName!: string;

    @OneToOne(() => ExternalRoute, (route) => route.permission, {
        nullable: true,
        onDelete: "SET NULL",
        eager: true,
    })
    @JoinColumn({ name: "externalRouteId" })
    public route?: ExternalRoute | null;

    @ManyToMany(() => ExternalRole, (role) => role.permissions)
    public roles!: ExternalRole[];
}