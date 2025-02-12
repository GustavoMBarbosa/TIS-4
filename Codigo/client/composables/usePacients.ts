export const usePacients = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.API_URL;
  const axios = useAxios();
  const { listExams } = useExams();
  const { listSurgeries } = useSurgeries();
  const { listEvolutions } = useEvolutions();
  const { listTreatments } = useTreatments();

  const signs = {
    aquarius: "Aquário",
    aries: "Áries",
    cancer: "Câncer",
    capricorn: "Capricórnio",
    scorpio: "Escorpião",
    gemini: "Gêmeos",
    leo: "Leão",
    libra: "Libra",
    pisces: "Peixes",
    sagittarius: "Sagitário",
    taurus: "Touro",
    virgo: "Virgem",
  };

  const getPacient = async (id: number) => {
    const pacient = useCookie("pacient");
    let [{ data: pacientData }, exams, surgeries, evolutions, treatments] = await Promise.all([
      axios.get(`${apiUrl}/pacient/${id}`),
      listExams(id),
      listSurgeries(id),
      listEvolutions(id),
      listTreatments(id),
    ]);

    if (pacient.value) {
      const parsedPacient = JSON.parse(decodeURIComponent(pacient.value));
      if (
        parsedPacient.id == id &&
        parsedPacient.updatedDate > pacientData.updatedDate
      )
        pacientData = parsedPacient;
    } else {
      cachePacient(pacientData);
    }

    pacientData.exams = exams;
    pacientData.surgeries = surgeries;
    pacientData.evolutions = evolutions;
    pacientData.treatments = treatments;

    return pacientData;
  };

  const updatePacient = async (pacient: Pacient) => {
    pacient.updatedAt = new Date();
    const { data } = await axios.put(
      `${apiUrl}/pacient/${pacient.id}`,
      pacient
    );
    return data;
  };

  const deletePacient = async (id: string) => {
    const { data } = await axios.delete(`${apiUrl}/pacient/${id}`);
    return data;
  };

  const createPacient = async (pacient: Pacient) => {
    const { data } = await axios.post(`${apiUrl}/pacient`, pacient);
    return data;
  };

  const listPacients = async () => {
    const { data } = await axios.get(`${apiUrl}/pacient`);
    return data;
  };

  const cachePacient = (pacient: Pacient) => {
    const cookie = useCookie("pacient", {
      maxAge: 7200,
      sameSite: "lax",
    });
    cookie.value = encodeURIComponent(JSON.stringify(pacient));
  };

  return {
    getPacient,
    updatePacient,
    deletePacient,
    createPacient,
    listPacients,
    cachePacient,
    signs,
  };
};
