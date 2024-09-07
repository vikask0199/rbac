import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalPermission } from "./ExternalPermission";

@Entity()
export class ExternalRoute {
    @PrimaryGeneratedColumn("uuid")
    public externalRouteId!: string;

    @Column({ nullable: false, unique: true })
    public externalRoutePath!: string;

    @Column({ nullable: false, unique: true })
    public routeDisplayName!: string;

    @OneToOne(() => ExternalPermission, (permission) => permission.route, {
        onDelete: "SET NULL",
        nullable: true,
    })
    public permission!: ExternalPermission | null;
}