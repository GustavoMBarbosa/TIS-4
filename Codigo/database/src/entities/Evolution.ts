import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Pacient } from './Pacient';

@Entity()
export class Evolution {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => Pacient, (pacient) => pacient.evolutions, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'pacient_id' })
	pacient: Pacient;

	@Column()
	date: Date;

	// TODO: Avaliar o limite de 1000 caracteres
	@Column({ nullable: true, type: 'text' })
	notes: string;
}
