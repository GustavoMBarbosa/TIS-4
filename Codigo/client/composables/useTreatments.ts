export const useTreatments = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.API_URL;
    const axios = useAxios();
    
    const listTreatments = async (pacientId: string) => {
      const { data } = await axios.get(`${apiUrl}/treatment/list/${pacientId}`);
      return data;
    };
    
    const getTreatment = async (id: number) => {
      const { data } = await axios.get(`${apiUrl}/treatment/${id}`);
      return data;
    };
  
    const createTreatment = async (pacientId: string, treatment: Treatment) => {
      const { data } = await axios.post(`${apiUrl}/treatment/${pacientId}`, treatment);
      return data;
    };
  
    const updateTreatment = async (treatment: Treatment) => {
      const { data } = await axios.put(
        `${apiUrl}/treatment/${treatment.id}`,
        treatment
      );
      return data;
    };
  
    const deleteTreatment = async (id: string) => {
      const { data } = await axios.delete(`${apiUrl}/treatment/${id}`);
      return data;
    };
  
    return {
      listTreatments,
      getTreatment,
      createTreatment,
      updateTreatment,
      deleteTreatment,
    };
  };
  