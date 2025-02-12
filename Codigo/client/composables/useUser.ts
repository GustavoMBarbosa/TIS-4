import { authStore } from '~/stores/auth';

export const useUser = () => {
	const config = useRuntimeConfig();
	const apiUrl = config.public.API_URL;
	const axios = useAxios();
	const auth = authStore();

	const saveUser = async (user: User) => {
		const data = await updateUser(user);
		if (data) auth.saveUser(data);
		return data;
	};

	const getUser = async (id: string) => {
		const { data } = await axios.get(`${apiUrl}/user/${id}`);
		return data;
	};

	const updateUser = async (user: User) => {
		const { data } = await axios.put(`${apiUrl}/user/${user.id}`, user);
		return data;
	};

	const changePassword = async (id: string, password: string) => {
		const { data } = await axios.put(`${apiUrl}/user/change-password/${id}`, { password });
		return data;
	};

	const deleteUser = async (id: string) => {
		const { data } = await axios.delete(`${apiUrl}/user/${id}`);
		return data;
	};

	const createUser = async (user: User) => {
		const { data } = await axios.post(`${apiUrl}/user`, user);
		return data;
	};

	const listUsers = async () => {
		const { data } = await axios.get(`${apiUrl}/user`);
		return data;
	};

	return { saveUser, updateUser, changePassword, deleteUser, createUser, listUsers };
};
