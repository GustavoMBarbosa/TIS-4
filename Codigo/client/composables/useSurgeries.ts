export const useSurgeries = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.API_URL;
  const axios = useAxios();
  
  const listSurgeries = async (pacientId: string) => {
    const { data } = await axios.get(`${apiUrl}/surgery/list/${pacientId}`);
    return data;
  };
  
  const getSurgery = async (id: number) => {
    const { data } = await axios.get(`${apiUrl}/surgery/${id}`);
    return data;
  };

  const createSurgery = async (pacientId: string, surgery: Surgery) => {
    const { data } = await axios.post(`${apiUrl}/surgery/${pacientId}`, surgery);
    return data;
  };

  const updateSurgery = async (surgery: Surgery) => {
    const { data } = await axios.put(
      `${apiUrl}/surgery/${surgery.id}`,
      surgery
    );
    return data;
  };

  const deleteSurgery = async (id: string) => {
    const { data } = await axios.delete(`${apiUrl}/surgery/${id}`);
    return data;
  };

  return {
    listSurgeries,
    getSurgery,
    createSurgery,
    updateSurgery,
    deleteSurgery,
  };
};
