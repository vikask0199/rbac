import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';

@Entity('suhora_users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ nullable: false })
    public username!: string;

    @Column({ unique: true, nullable: false })
    public userEmail!: string;

    @Column({ nullable: true })
    public password!: string;

    @Column({ nullable: true, default: false })
    public isAccountActivated!: boolean;

    @Column({ nullable: true })
    public createdBy!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    public updatedAt!: Date;

    @ManyToMany(() => Role, (role) => role.users, { eager: false, cascade: true })
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
    public roles!: Role[];
    
}