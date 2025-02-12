import 'reflect-metadata';
import { DataSource } from 'typeorm';

import 'dotenv/config';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: 5432,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
	synchronize: true,
	logging: false,
	entities: [__dirname + '/entities/*.ts'],
	migrations: [__dirname + '/migrations/*.ts'],
	subscribers: [],
	ssl: true,
	extra: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
});
