import axios from "axios"

//http://localhost:3001/user
///api/user

async function saveUser(user: any) {
    const { data } = await axios.post("http://localhost:3001/user", user) 
    return data
}

async function deleteUser(user: any) {
    const { data } = await axios.delete("/api/user", user)
    return data
}

async function getUser(user: any) {
    const { data } = await axios.get("/api/user", user)
    return data
}

async function updateUser(user: any) {
    const { data } = await axios.put("/api/user", user)
    return data
}

async function getAllUsers() {
    const { data } = await axios.get("/api/user")
    return data
}

export default{
    saveUser,
    deleteUser,
    getUser,
    updateUser,
    getAllUsers
}