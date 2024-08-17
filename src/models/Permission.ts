import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';

@Entity("suhora_permissions")
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ unique: true, nullable: false })
    public permissionName!: string;

    @Column({ nullable: true })
    public createdBy!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    public updatedAt!: Date;

    @ManyToMany(() => Role, (role) => role.permissions, {nullable: true})
    public roles!: Role[];
}
