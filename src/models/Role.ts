import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './Permission';
import { User } from './User';

@Entity('suhora_roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ unique: true, nullable: false })
    public roleName!: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt!: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    public updatedAt!: Date;

    @Column({nullable: true})
    public createdBy!: string;

    @ManyToMany(() => Permission, (permission) => permission.roles, { eager: false, cascade: true })
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        }
    })
    public permissions?: Permission[];

    @ManyToMany(() => User, (user) => user.roles, {nullable: true})
    public users?: User[];
}