import axios from 'axios'
const cinemaURL = `http://localhost:${process.env.PORT}/api`

const authUser = async (username, password)=>{
    const resp = await axios.post(`${cinemaURL}/users/auth`, {username:username, password:password})
    return resp.data
}
const firstLog = async (username, password)=>{
    const resp = await axios.put(`${cinemaURL}/users/auth`, {username:username, password:password})
    return resp.data
}
const createUser = async (info,data)=>{
    const resp = await axios.post(`${cinemaURL}/users`, {info:info, permissions:data})
    return resp.data
}
const getUsers = async ()=>{
    const resp = await axios.get(`${cinemaURL}/users`)
    return resp.data
}
const deleteUser = async (id)=>{
    const resp = await axios.delete(`${cinemaURL}/users/${id}`)
    if (resp.status === 200){
        return true
    }else{
        return false
    }
}
const getUser = async (id)=>{
    const resp = await axios.get(`${cinemaURL}/users/${id}`)
    return resp.data
}
const updateUser = async (id,data)=>{
    const resp = await axios.put(`${cinemaURL}/users/${id}`,{...data})
    return resp.data
}
export {authUser,createUser, getUsers, firstLog, deleteUser,getUser,updateUser}