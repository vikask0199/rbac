import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';
import { SuperAdmin } from './SuperAdmin';

@Entity('suhora_users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: false })
    name!: string;

    @Column({ unique: true, nullable: false })
    email!: string;

    @Column({ nullable: true })
    password!: string;

    @Column({ nullable: true, default: false })
    isAccountActivated!: boolean;

    @Column({ nullable: true })
    createdBy!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @ManyToMany(() => Role, (role) => role.users, { eager: true, cascade: true })
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        }
    })
    roles!: Role[];
    
}