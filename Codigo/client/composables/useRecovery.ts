export default function useRecovery() {
	const config = useRuntimeConfig();
	const apiUrl = config.public.API_URL;
	const axios = useAxios();

	const sendEmail = async (email: string) => {
		const { data } = await axios.post(`${apiUrl}/generate-reset-token`, { email });
		const { data: emailData } = await axios.post(`${apiUrl}/send-email`, {
			to: email,
			key: data,
		});
	};

	const checkPassword = async (password: string, passwordVerify: string) => {
		if (password !== passwordVerify) {
			return 'As senhas não correspondem';
		} else if (password.length < 8) {
			return 'A senha deve conter pelo menos 8 caracteres';
		}
		return '';
	};

	const changePassword = async (password: string, token: string) => {
		const { data } = await axios.put(`${apiUrl}/reset-password`, { password, token });
		return data;
	};

	return { sendEmail, checkPassword, changePassword };
}
