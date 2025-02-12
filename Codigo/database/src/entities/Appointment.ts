import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pacient } from './Pacient';

enum Frequency {
	DAILY = 'DAILY',
	WEEKLY = 'WEEKLY',
	MONTHLY = 'MONTHLY',
	ONCE = 'ONCE',
}

@Entity()
export class Appointment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false, type: 'timestamp with time zone' })
	startDate: Date;

	@Column({ nullable: false, type: 'timestamp with time zone' })
	endDate: Date;

	@Column({
		type: 'enum',
		enum: Frequency,
		default: Frequency.ONCE,
	})
	frequency: Frequency;

	@Column('simple-array', { nullable: true })
	canceledAppointmentDates: Date[];

	@ManyToOne(() => Pacient, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'pacient_id' })
	pacient: Pacient;
}
