import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExternalUser } from "./ExternalUser";
import { OrgProfile } from "./OrgProfile";

@Entity()
export class SubscriptionPlan {
    @PrimaryGeneratedColumn("uuid")
    public planId!: string;

    @Column({ nullable: false, unique: true })
    public planName!: string;

    @Column("json", { nullable: false })
    public pricing!: {
        monthlyPrice: number;
        annualPrice: number;
    };

    @Column("json", { nullable: false })
    public features!: {
        maxAdmins: number;
        maxCreators: number;
        maxViewers: number;
    };

    @Column({ nullable: false })
    public numberOfCredits!: number;

    @Column({ nullable: false })
    public durationInMonths!: number;

    @Column({ default: true })
    public isGlobal!: boolean;

    @Column({ nullable: false })
    public isPlanActive!: boolean;

    @CreateDateColumn()
    public startDate!: Date;

    @Column("timestamp", { nullable: true })
    public endDate!: Date;

    @ManyToOne(() => ExternalUser, (user) => user.subscriptionPlans, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "externalUserId" })
    public externalUser!: ExternalUser;

    @ManyToOne(() => OrgProfile, (orgProfile) => orgProfile.subscriptions, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "organizationId" })
    public organization?: OrgProfile;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;
}