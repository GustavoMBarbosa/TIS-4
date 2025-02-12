import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { Address } from '../types/Address';

enum UserRole {
    ADMIN = 'admin',
    ACCOUNTANT = 'accountant',
    SECRETARY = 'secretary',
    BASIC = 'basic',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: true, unique: true })
    cpf: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.BASIC,
    })
    role: UserRole;

    @Index()
    @Column({ nullable: true, unique: true })
    bearerToken: string;

	@Column({ type: "jsonb", nullable: true, default: {} })
	address: Address;

    @Column({ nullable: true })
    resetToken: string;

    @Column({ nullable: true })
    resetTokenExpiresAt: Date;
}
