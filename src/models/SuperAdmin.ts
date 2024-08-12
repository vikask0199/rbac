import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("suhora_super_admins")
export class SuperAdmin {

    @PrimaryGeneratedColumn('uuid')
    public id!: number;

    @Column({ unique: true })
    public name!: string;

    @Column({ unique: true })
    public primaryEmail!: string;

    @Column({ unique: true })
    public secondryEmail!: string;

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
