import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pacient } from './Pacient';

@Entity()
export class Surgery {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	date: Date;

	@Column({ nullable: true })
	appraisal?: string;

	@ManyToOne(() => Pacient, (pacient) => pacient.surgeries, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'pacient_id' })
	pacient: Pacient;
}
