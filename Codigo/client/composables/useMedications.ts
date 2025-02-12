export const useMedications = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.API_URL;
    const axios = useAxios();

    const listAllRemedios = async () => {
        const { data } = await axios.get(`${apiUrl}/medication`);
        return data;
    };

    const createMedication = async (medication: any) => {
        const { data } = await axios.post(`${apiUrl}/medication`, medication);
        return data;
    };

    const updateMedication = async (id: string, medication: any) => {
        const { data } = await axios.put(`${apiUrl}/medication/${id}`, medication);
        return data;
    };

    const deleteMedication = async (id: string) => {
        const { data } = await axios.delete(`${apiUrl}/medication/${id}`);
        return data;
    };

    return {
        listAllRemedios,
        createMedication,
        updateMedication,
        deleteMedication,
    };
};
