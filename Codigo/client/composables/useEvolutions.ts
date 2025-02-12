export const useEvolutions = () => {

    const config = useRuntimeConfig();
    const apiUrl = config.public.API_URL;
    const axios = useAxios();

    const listEvolutions = async (pacientId: string) => {
        const { data } = await axios.get(`${apiUrl}/evolution/list/${pacientId}`);
        return data;
    }

    const createEvolution = async (pacientId: string, evolution: Evolution) => {
        const { data } = await axios.post(`${apiUrl}/evolution/${pacientId}`, evolution)
        return data;
    }

    const deleteEvolution = async (id: Number) => {
        const { data } = await axios.delete(`${apiUrl}/evolution/${id}`)
        return data;
    }

    const updateEvolution = async (id: Number, evolution: Evolution) => {
        const { data } = await axios.put(`${apiUrl}/evolution/${id}`, evolution)
        return data;
    }

    return {
        listEvolutions,
        createEvolution,
        deleteEvolution,
        updateEvolution
    }

}