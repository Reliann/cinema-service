const axios = require('axios')

const URLtoMovies = `${process.env.SUBS_URL}/movies` || 'http://localhost:8001/members'


const addNewMovie = async (data)=>{
    const resp = await axios.post(`${URLtoMovies}`,data)
    return resp.data
}
const deleteMovie = async (id)=>{
    const resp = await axios.delete(`${URLtoMovies}/${id}`)
    return resp.data
}

const updateMovie = async (id, data)=>{
    const resp = await axios.put(`${URLtoMovies}/${id}`, data)
    return resp.data
}
const getMovie = async (id)=>{
    const resp = await axios.get(`${URLtoMovies}/${id}`)
    return resp.data
}
const getAllMovies = async ()=>{
    const resp = await axios.get(`${URLtoMovies}`)
    return resp.data
}
module.exports = {addNewMovie,deleteMovie,updateMovie,getMovie,getAllMovies}
