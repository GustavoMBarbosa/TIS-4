import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ExamResultArrayTransformer } from '../types/ExamResult';
import type { ExamResult } from '../types/ExamResult';
import { Pacient } from './Pacient';

@Entity()
export class Exam {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 500 })
	name: string;

	@Column({ type: 'varchar', nullable: true })
	reference: string;

	@Column({
		type: 'jsonb',
		nullable: true,
		default: () => "CAST('[]' AS jsonb)",
		transformer: new ExamResultArrayTransformer(),
	})
	results: ExamResult[];

	@ManyToOne(() => Pacient, (pacient) => pacient.exams, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'pacient_id' })
	pacient: Pacient;
}
