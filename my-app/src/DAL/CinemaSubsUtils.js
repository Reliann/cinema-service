import axios from 'axios'

const cinemaURL = `https://localhost/api`

const getFullMoviesData= async()=>{
    const resp = await axios.get(`${cinemaURL}/subs/movies`)
    return resp.data
}
const addNewMovie= async(data)=>{
    const resp = await axios.post(`${cinemaURL}/movies`,data)
    return resp.data
}
const deleteMovie = async (id) =>{
    const resp = await axios.delete(`${cinemaURL}/movies/${id}`)
    return resp.data
}
const updateMovie = async (id,data) =>{
    const resp = await axios.put(`${cinemaURL}/movies/${id}`,data)
    return resp.data
}
const getMovieById = async (id) =>{
    const resp = await axios.get(`${cinemaURL}/movies/${id}`)
    return resp.data
}
const getAllMovies = async ()=>{
    const resp = await axios.get(`${cinemaURL}/movies`)
    return resp.data
}

export {getFullMoviesData,addNewMovie,deleteMovie,updateMovie,getMovieById,getAllMovies}