import { useEffect, useState } from "react"
import { subscribeToMovie } from "../../DAL/cinemaMembersUtils"
import { getAllMovies } from "../../DAL/CinemaSubsUtils"

const SubToMovie = (props)=>{
    // props is a list of movies id not to display
    const [unwatchedMovies, setUnwatchedMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({
        movieId:"",
        watchDate:""
    })
    const [message,setMessage] = useState("")
    useEffect(()=>{
        const fetchData=async()=>{
            const resp = await getAllMovies()
            setUnwatchedMovies(resp.filter((movie)=>(!props.movies.find((mov)=>mov.movieId === movie._id))))
        }   
        fetchData() 
    },[])

    const customSubmit=async (e)=>{
        e.preventDefault()
        for (const key in selectedMovie){
            if(!selectedMovie[key]){
                setMessage(` please fill in ${key==="movieId"?"Movie Name":"Watch Date"}`)
                return
            } 
        }
        const resp = await subscribeToMovie(props.memberId,selectedMovie.movieId,selectedMovie.watchDate)
        if (resp){
            setMessage("Movie Was Subscribed!")
            // to update the perant...
            setUnwatchedMovies(unwatchedMovies.filter((movie)=>(movie._id!==selectedMovie.movieId)))
            e.target.movieId.value=""
            setSelectedMovie({
                movieId:"",
                watchDate:""
            })
            props.watchedCbk()
        }else{
            setMessage("error!")
        }
    }
    const handleInput = (e) =>{
        setSelectedMovie({...selectedMovie,[e.target.name]:e.target.value})
    }
    return <div>
        <form onSubmit={customSubmit}>
        <select name="movieId" onChange={handleInput} defaultValue="">
            <option disabled value ="">Select Movie</option>
            {unwatchedMovies.map((movie)=>(
                <option key = {movie._id} value={movie._id}>{movie.name}</option>
            ))}
        </select>
        <input value={selectedMovie.watchDate} onChange={handleInput} type="date" name="watchDate"/>
        <input type="submit" value="subscribe"/><br/>
        {message}
        </form>
    </div>
}

export default SubToMovie