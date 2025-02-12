export const useHome = (role: 'admin' | 'accountant' | 'secreaty' | 'basic') => {
	const config = useRuntimeConfig();
	const apiUrl = config.public.API_URL;
	const axios = useAxios();

	// Adicionar estado inicial
	const data = ref(null);
	const loading = ref(false);
	const error = ref(null);

	const getInfo = async () => {
		try {
			loading.value = true;
			switch (role) {
				case 'admin':
					data.value = await adminData();
					return data.value;
				case 'basic':
					return 'default';
				default:
					return null;
			}
		} catch (err) {
			error.value = err;
			return null;
		} finally {
			loading.value = false;
		}
	};

	const adminData = async () => {
		const [weeklyAppointments, dailyAppointments, firstAppointment, totalPacients] = await Promise.all([
			axios.get(`${apiUrl}/home/weekly-appointments`),
			axios.get(`${apiUrl}/home/daily-appointments`),
			axios.get(`${apiUrl}/home/first-appointment`),
			axios.get(`${apiUrl}/home/total-pacients`),
		]);

		console.log(firstAppointment.data);

		return {
			weeklyAppointments: weeklyAppointments.data,
			dailyAppointments: dailyAppointments.data,
			firstAppointment: firstAppointment.data,
			totalPacients: totalPacients.data,
		};
	};

	return {
		getInfo,
		data,
		loading,
		error,
	};
};
