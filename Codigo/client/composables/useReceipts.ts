export const useReceipts = () => {
	const config = useRuntimeConfig();
	const apiUrl = config.public.API_URL;
	const axios = useAxios();

	const listAllReceipts: (period: Date[]) => Promise<Receipt[]> = async (period = []) => {
		const { data } = await axios.post(`${apiUrl}/receipt/join`, { period });
		return data;
	};

	const createReceipt = async (receipt: Receipt) => {
		if (receipt.date) {
			const { data } = await axios.post(`${apiUrl}/receipt`, receipt);
			return data;
		}
	};

	const updateReceipt = async (id: string, receipt: Receipt) => {
		const { data } = await axios.put(`${apiUrl}/receipt/${id}`, receipt);
		return data;
	};

	const deleteReceipt = async (id: string) => {
		const { data } = await axios.delete(`${apiUrl}/receipt/${id}`);
		return data;
	};

	return {
		listAllReceipts,
		createReceipt,
		updateReceipt,
		deleteReceipt,
	};
};
