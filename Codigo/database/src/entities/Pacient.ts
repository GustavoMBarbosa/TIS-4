import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Evolution } from './Evolution';
import { Receipt } from './Receipt';
import { Family, Record, Biography, FisicalExam } from '../types/Pacient';
import { Address } from '../types/Address';
import { Exam } from './Exam';
import { Surgery } from './Surgery';
import { Treatment } from './Treatment';
enum BiologicalSex {
    MALE = 'M',
    FEMALE = 'F',
}

enum ZodiacSign {
    ARIES = 'aries',
    TAURUS = 'taurus',
    GEMINI = 'gemini',
    LEO = 'leo',
    LIBRA = 'libra',
    SCORPIO = 'scorpio',
    SAGITTARIUS = 'sagittarius',
    CAPRICORN = 'capricorn',
    AQUARIUS = 'aquarius',
    PISCES = 'pisces',
    VIRGO = 'virgo',
    CANCER = 'cancer',
}

enum BloodType {
    O_POSITIVE = 'O+',
    O_NEGATIVE = 'O-',
    A_POSITIVE = 'A+',
    A_NEGATIVE = 'A-',
    B_POSITIVE = 'B+',
    B_NEGATIVE = 'B-',
    AB_POSITIVE = 'AB+',
    AB_NEGATIVE = 'AB-',
}

enum MaritalStatus {
    MARRIED = 'married',
    DIVORCED = 'divorced',
    SEPARED = 'separed',
    SINGLE = 'single',
    WIDOWER = 'widower',
}

@Entity()
export class Pacient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true, unique: true })
    cpf: string;

    @Column({ nullable: true })
    birthDate: Date;

    @Column({
        type: 'enum',
        enum: BiologicalSex,
        nullable: true,
    })
    biologicalSex: BiologicalSex;

    @Column({
        type: 'enum',
        enum: ZodiacSign,
        nullable: true,
    })
    sign: ZodiacSign;

    @Column({
        type: 'enum',
        enum: ZodiacSign,
        nullable: true,
    })
    ascendant: ZodiacSign;

    @Column({ type: 'varchar', length: 500, nullable: true })
    birthPlace: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    @Column({
        type: 'enum',
        enum: BloodType,
        nullable: true,
    })
    bloodType: BloodType;

    @Column({
        type: 'enum',
        enum: MaritalStatus,
        nullable: true,
    })
    maritalStatus: MaritalStatus;

    @Column({ nullable: true, type: 'varchar', length: 240 })
    indication: string;

    @Column({ nullable: true, type: 'varchar', length: 240 })
    diagnostic: string;

    @Column({ nullable: true, type: 'varchar', length: 240 })
    conduct: string;

    @Column({ nullable: true, type: 'jsonb', default: {} })
    family: Family;

    @Column({ nullable: true, type: 'jsonb', default: {} })
    biography: Biography;

    @Column({ nullable: true, type: 'jsonb', default: {} })
    record: Record;

    @OneToMany(() => Treatment, (treatment) => treatment.pacient)
    treatments: Treatment[];

    @Column({ nullable: true, type: 'varchar', length: 1000 })
    mainComplaint: string;

    @Column({ nullable: true, type: 'jsonb', default: {} })
    fisical_exam: FisicalExam;

    @OneToMany(() => Exam, (exam) => exam.pacient)
    exams: Exam[];

    @OneToMany(() => Surgery, (surgery) => surgery.pacient)
    surgeries: Surgery[];

    @Column({ type: 'jsonb', nullable: true, default: {} })
    address: Address;

    @OneToMany(() => Evolution, (evolution) => evolution.pacient)
    evolutions: Evolution[];

    @OneToMany(() => Receipt, (receipt) => receipt.pacient)
    receipts: Receipt[];

    @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
