import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("suhora_super_admins")
export class SuperAdmin {

    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ nullable: false })
    public name!: string;

    @Column({ unique: true })
    public primaryEmail!: string;

    @Column({ unique: true })
    public secondaryEmail!: string;

    @Column({ nullable: true, select: false })
    public password?: string;

    @Column({ default: false })
    public isActive!: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    public updatedAt!: Date;

    @Column({ default: "SuperAdmin" })
    public role!: string;

}
