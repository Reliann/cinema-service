const axios = require('axios')

const URLtoMembers = 'http://localhost:8001/members'

const getAllMembers = async ()=>{
    const resp = await axios.get(`${URLtoMembers}`)
    return resp.data
}
const getMember = async (id)=>{
    const resp = await axios.get(`${URLtoMembers}/${id}`)
    return resp.data
}
const addMember = async (data)=>{
    const resp = await axios.post(`${URLtoMembers}`, data)
    return resp.data
}
const updateMember = async (id, data)=>{
    const resp = await axios.put(`${URLtoMembers}/${id}`,data)
    return resp.data
}
const deleteMember = async (id)=>{
    const resp = await axios.delete(`${URLtoMembers}/${id}`)
    return resp.data
}

module.exports = {
    getAllMembers,
    getMember,
    addMember,
    updateMember,
    deleteMember
}