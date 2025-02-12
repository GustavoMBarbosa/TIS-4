import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pacient } from './Pacient';

@Entity()
export class Treatment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	element: string;

	@Column({ nullable: true })
	spiritual: string;

	@Column({ nullable: true })
	sensorial: string;

	@Column({ nullable: true })
	rhythmic: string;

	@Column({ nullable: true })
	motor: string;

	@Column({ nullable: true })
	mental: string;

	@Column({ default: false })
	custom: boolean;

	@ManyToOne(() => Pacient, (pacient) => pacient.treatments, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'pacient_id' })
	pacient: Pacient;
}
