import axios from 'axios'

const URLtoMembers = `http://localhost:${process.env.PORT}/api`
const getMembers = async () =>{
    const resp = await axios.get(`${URLtoMembers}/members`)
    return resp.data
}
const getMember = async (id) =>{
    const resp = await axios.get(`${URLtoMembers}/members/${id}`)
    return resp.data
}
const addMember = async (data) =>{
    const resp = await axios.post(`${URLtoMembers}/members`,data)
    return resp.data
}
const editMember =async  (id, data) =>{
    const resp = await axios.put(`${URLtoMembers}/members/${id}`,data)
    return resp.data
}
const deleteMember = async (id)=>{
    const resp = await axios.delete(`${URLtoMembers}/members/${id}`)
    return resp.data
}
const subscribeToMovie = async (id, movieId,data)=>{
    const resp = await axios.post(`${URLtoMembers}/members/${id}/${movieId}`,{watchDate:data})
    return resp.data
}
const removeSubscription = async (id, movieId)=>{
    const resp = await axios.delete(`${URLtoMembers}/members/${id}/${movieId}`)
    return resp.data
}

const getSubsByMember = async (id)=>{
    const resp = await axios.get(`${URLtoMembers}/subs/${id}`)
    return resp.data
}

export  {
    getMembers,
    getMember,
    addMember,
    editMember,
    deleteMember,
    subscribeToMovie,
    removeSubscription,
    getSubsByMember
}