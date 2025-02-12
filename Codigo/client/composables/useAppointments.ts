export const useAppointments = () => {
	// Adicionar verificação de contexto
	if (process.server) {
		const nuxtApp = useNuxtApp();
		if (!nuxtApp) {
			console.error('Nuxt App not available');
			return;
		}
	}

	// Usar try-catch para garantir que as dependências estão disponíveis
	try {
		const config = useRuntimeConfig();
		const axios = useAxios();
		const apiUrl = config.public.API_URL;

		const listAppointments = async () => {
			try {
				const { data } = await axios.get(`${apiUrl}/appointment/list`);
				return data;
			} catch (error) {
				console.error('Error listing appointments:', error);
				throw error;
			}
		};

		const getAppointment = async (id: number) => {
			const { data } = await axios.get(`${apiUrl}/appointment/${id}`);
			return data;
		};

		const createAppointment = async (appointment: Appointment) => {
			const { data } = await axios.post(`${apiUrl}/appointment`, appointment);
			return data;
		};

		const updateAppointment = async (appointment: Appointment) => {
			const { data } = await axios.put(`${apiUrl}/appointment/${appointment.id}`, appointment);
			return data;
		};

		const deleteAppointment = async (appointment: Appointment, type: string) => {
			if (type == 'all') {
				const { data } = await axios.delete(`${apiUrl}/appointment/${appointment.id}`);
				return data;
			} else {
				delete appointment.startHour;
				delete appointment.endHour;
				delete appointment.pacient;
				if (!appointment.canceledAppointmentDates) appointment.canceledAppointmentDates = [];
				appointment.canceledAppointmentDates.push(appointment.startDate);
				return updateAppointment(appointment);
			}
		};

		return { listAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointment };
	} catch (error) {
		console.error('Error initializing useAppointments:', error);
		// Retornar funções vazias para evitar erros de undefined
		return {
			listAppointments: async () => [],
			getAppointment: async () => null,
			createAppointment: async () => null,
			updateAppointment: async () => null,
			deleteAppointment: async () => null,
		};
	}
};
