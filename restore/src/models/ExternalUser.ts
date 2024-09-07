import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrgProfile } from "./OrgProfile";
import { PlanHistory } from "./PlanHistory";
import { SubscriptionPlan } from "./SubscriptionPlan";
import { ExternalRole } from "./ExternalRole";

@Entity()
export class ExternalUser {
    @PrimaryGeneratedColumn("uuid")
    public externalUserId!: string;

    @Column({ nullable: false })
    public externalUserName!: string;

    @Column({ nullable: false, unique: true })
    public externalUserEmail!: string;

    @Column({ nullable: true })
    public externalUserPassword?: string;

    @Column({ default: false, nullable: false })
    public isExternalUserVerified!: boolean;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    // Organization context (nullable for individuals)
    @ManyToOne(() => OrgProfile, (orgProfile) => orgProfile.members, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: "orgId" })
    public orgProfile?: OrgProfile | null;

    // Role (required)
    @ManyToOne(() => ExternalRole, { nullable: false, eager: true })
    @JoinColumn({ name: "externalRoleId" })
    public role!: ExternalRole;

    @OneToMany(() => SubscriptionPlan, (plan) => plan.externalUser, { nullable: true, cascade: true })
    public subscriptionPlans!: SubscriptionPlan[];

    @OneToMany(() => PlanHistory, (planHistory) => planHistory.externalUser, { nullable: true, cascade: true })
    public planHistories!: PlanHistory[];
}