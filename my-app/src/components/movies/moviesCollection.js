import {useContext, useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'; 
import {AuthUserContext} from '../authenticatedUserContext'
import {getFullMoviesData} from '../../DAL/CinemaSubsUtils'
import Movie from './movie'

const MoviesCollection = ()=>{
    const navigate = useNavigate()
    const [AllMovies,setAllMovies] = useState([])
    const [user] = useContext(AuthUserContext)
    const [search, setSearch] = useState("")
    const {id} = useParams()
    useEffect(()=>{
        if (Object.keys(user).length > 0 && !user.permissions.viewMovies){
            navigate('/403')
        }
    })
    useEffect(()=>{
        const fetchData = async()=>{
            const data = await getFullMoviesData()
        if (data){
            if(id){
                setAllMovies(data.filter(movie=>movie.movie._id===id))
            }else{
                setAllMovies(data)
            }
        }else{
            navigate('/404')
        }
    }  
    fetchData()
    },[])
    
    return <div>
        <h4>All Movies And Subs</h4>
        Search: <input type="search" onChange={(e)=>{setSearch(e.target.value)}}/>
        {AllMovies.flatMap((movie=>{
            if(search ){
                if(movie.name.toLowerCase().includes(search.toLowerCase())){
                    return <Movie key = {movie.movie._id} fullMovie = {movie} deleteCbk = {()=>{setAllMovies(AllMovies.filter((mov)=>(movie.movie._id!==mov.movie._id)))}}/>
            }
            }else{
                return <Movie key = {movie.movie._id} fullMovie = {movie} deleteCbk = {()=>{setAllMovies(AllMovies.filter((mov)=>(movie.movie._id!==mov.movie._id)))}}/>

            }
        }))}
    </div>
}

export default  MoviesCollection