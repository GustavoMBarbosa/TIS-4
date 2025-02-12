export const useExams = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.API_URL;
  const axios = useAxios();
  
  const listExams = async (pacientId: string) => {
    const { data } = await axios.get(`${apiUrl}/exam/list/${pacientId}`);
    return data;
  };
  
  const getExam = async (id: number) => {
    const { data } = await axios.get(`${apiUrl}/exam/${id}`);
    return data;
  };

  const createExam = async (pacientId: string, exam: Exam) => {
    const { data } = await axios.post(`${apiUrl}/exam/${pacientId}`, exam);
    return data;
  };

  const updateExam = async (exam: Exam) => {
    const { data } = await axios.put(
      `${apiUrl}/exam/${exam.id}`,
      exam
    );
    return data;
  };

  const deleteExam = async (id: string) => {
    const { data } = await axios.delete(`${apiUrl}/exam/${id}`);
    return data;
  };

  return {
    listExams,
    getExam,
    createExam,
    updateExam,
    deleteExam,
  };
};
