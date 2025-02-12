import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pacient } from './Pacient';

@Entity()
export class Receipt {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	date: Date;

	@Column('decimal', { precision: 10, scale: 2, nullable: false })
	value: number;

	@ManyToOne(() => Pacient, (pacient) => pacient.receipts, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'pacient_id' })
	pacient: Pacient;
}
