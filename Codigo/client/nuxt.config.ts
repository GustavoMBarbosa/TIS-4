// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import { resolve } from 'path';

export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	alias: {
		'@': resolve(__dirname, '/'),
	},
	imports: {
		dirs: ['types', 'types/enum', 'composables', 'components', 'util'],
	},
	router: {
		extendRoutes(routes, resolve) {
			routes.push({
				name: 'recovery-password-id',
				path: '/recovery-password/:id',
				component: resolve(__dirname, 'pages/recovery-password/[id].vue'),
			});
		},
	},
	routeRules: {
		'/agenda': { ssr: false },
	},
	modules: ['@nuxtjs/tailwindcss', 'nuxt-vue3-google-signin'],
	googleSignIn: {
		clientId: process.env.GOOGLE_CLIENT_ID,
		scope: 'profile email',
	},
	plugins: ['~/plugins/index.ts'],
	css: ['~/assets/styles/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL,
		},
	},
	app: {
		head: {
			link: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
				},
			],
			title: 'MedSync',
		},
	},
});
