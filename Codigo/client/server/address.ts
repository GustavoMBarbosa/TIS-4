import axios from "axios"

export async function getAddress(cep: string) {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    return data
}

export async function getUfs() {
    const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`)
    return data
}

