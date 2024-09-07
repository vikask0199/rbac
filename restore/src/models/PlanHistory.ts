import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExternalUser } from "./ExternalUser";

@Entity()
export class PlanHistory {
    @PrimaryGeneratedColumn("uuid")
    public planHistoryId!: string;

    @Column({ nullable: false })
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

    @Column({ nullable: false })
    public isPlanActive!: boolean;

    @CreateDateColumn()
    public startDate!: Date;

    @Column("timestamp", { nullable: true })
    public endDate!: Date;

    @ManyToOne(() => ExternalUser, (user) => user.planHistories, { nullable: false, onDelete: "CASCADE" })
    public externalUser!: ExternalUser;
}