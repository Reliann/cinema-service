const axios = require('axios')

const URLtoSubs = `${prosses.env.SUBS_URL}/subscriptions` || 'http://localhost:8001/subscriptions'

const getFullMoviesData = async ()=>{
    const resp = await axios.get(`${URLtoSubs}/movies`)
    return resp.data
}

const addNewSubscription = async (id, movieId,data)=>{
    const resp = await axios.post(`${URLtoSubs}/${id}/${movieId}`,data)
    return resp.data
}
const removeSubscription = async (id, movieId)=>{
    const resp = await axios.delete(`${URLtoSubs}/${id}/${movieId}`)
    return resp.data
}

const getSubByMember = async (id)=>{
    const resp = await axios.get(`${URLtoSubs}/${id}/`)
    return resp.data
}

module.exports = {getFullMoviesData, removeSubscription,addNewSubscription,getSubByMember}