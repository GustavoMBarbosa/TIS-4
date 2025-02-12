import { defineStore } from 'pinia';

export const authStore = defineStore({
	id: 'authStore',
	state: () => ({
		authenticated: false,
		loading: true,
		user: {
			id: null,
			name: null,
			email: null,
			role: null,
			address: {},
		},
	}),
	actions: {
		async getUser() {
			const axios = useAxios();
			const config = useRuntimeConfig();
			const apiUrl = config.public.API_URL;
			const user = useCookie('user');
			this.user = JSON.parse(decodeURIComponent(user.value));
			this.loading = false;
			this.authenticated = true;

			try {
				const { data } = await axios.get(`${apiUrl}/user/${this.user.id}`);
				this.user = data;
			} catch {
				this.logout();
			}
		},
		async authenticateUser(user: User, route: string) {
			try {
				const axios = useAxios();
				const config = useRuntimeConfig();
				const apiUrl = config.public.API_URL;
				const { data } = await axios.post(`${apiUrl}/${route}`, user);

				if (data) {
					const user = useCookie('user', {
						maxAge: 3 * 60 * 60,
						sameSite: 'lax',
					});
					user.value = encodeURIComponent(JSON.stringify(data));
					this.authenticated = true;
					this.loading = false;
					this.user = data;
					navigateTo('/');
				}
			} catch (error) {
				throw error;
			}
		},
		async createUser(user: User) {
			console.log(user);
			await this.authenticateUser(user, 'register');
		},
		async login(user: User) {
			await this.authenticateUser(user, 'login');
		},
		saveUser(user: User) {
			const cookie = useCookie('user');
			cookie.value = encodeURIComponent(JSON.stringify(user));
			this.authenticated = true;
			this.loading = false;
			this.user = user;
		},
		logout() {
			navigateTo('/login');
			const user = useCookie('user');
			this.authenticated = false;
			this.user = {};
			user.value = null;
		},
	},
});
