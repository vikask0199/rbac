import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalUser } from "./ExternalUser";
import { SubscriptionPlan } from "./SubscriptionPlan";

@Entity()
export class OrgProfile {
    @PrimaryGeneratedColumn("uuid")
    public orgId!: string;

    @Column({ nullable: false })
    public orgName!: string;

    @Column({ nullable: false })
    public address!: string;

    @Column({ nullable: false })
    public contactNumber!: string;

    @CreateDateColumn()
    public createdAt!: Date;

    @OneToOne(() => ExternalUser, (externalUser) => externalUser.orgProfile, { nullable: true })
    @JoinColumn()
    public superAdmin!: ExternalUser;

    // Org members
    @OneToMany(() => ExternalUser, (externalUser) => externalUser.orgProfile, { nullable: true })
    public members!: ExternalUser[];

    // Subscriptions
    @OneToMany(() => SubscriptionPlan, (plan) => plan.organization, { nullable: true })
    public subscriptions!: SubscriptionPlan[];
}