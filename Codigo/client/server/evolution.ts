import axios from "axios"

//http://localhost:3001/evolution
///api/evolution

async function saveEvolution(evolution: any) {
    const { data } = await axios.post("http://localhost:3001/evolution", evolution) 
    return data
}

async function deleteEvolution(evolution: any) {
    const { data } = await axios.delete("/api/evolution", evolution)
    return data
}

async function getEvolution(evolution: any) {
    const { data } = await axios.get("http://localhost:3001/evolution", evolution)
    return data
}

async function updateEvolution(evolution: any) {
    const { data } = await axios.put("/api/evolution", evolution)
    return data
}

async function getAllEvolutions() {
    const { data } = await axios.get("/api/evolution")
    return data
}

export default{
    saveEvolution,
    deleteEvolution,
    getEvolution,
    updateEvolution,
    getAllEvolutions
}