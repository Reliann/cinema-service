import {useContext, useEffect, useState} from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'; 
import { getMovieById, updateMovie } from '../../DAL/CinemaSubsUtils';
import {AuthUserContext} from '../authenticatedUserContext'

const EditMovie = ()=>{
    const [user] = useContext(AuthUserContext)
    const [message,setMessage]=useState("")
    const {id} = useParams()
    const [inputs, setInputs] = useState({
        name:"",
        genres:[],
        image:"",
        premiered: Date(),
        summary:"",
        rating:0
    })
    const navigate = useNavigate()
    // will redirect if the user dosn't have permission
    useEffect(()=>{
        if (Object.keys(user).length > 0 && !user.permissions.updateMovies){
            navigate('/403')
        }
    })
    useEffect(()=>{
        const fetchData=async()=>{
            const resp = await getMovieById(id)
            if (resp){
                setInputs(resp)
            }
        }
        fetchData()
    },[])
    const handleInput = (e) =>{
        if(e.target.name==="genres"){
            setInputs({...inputs,[e.target.name]:e.target.value.split(",")})
        }else{
            setInputs({...inputs,[e.target.name]:e.target.value})
        }
    }
    const customSubmit = async (e)=>{
        e.preventDefault()
        for (const key in inputs){
            if(!inputs[key]){
                setMessage(` please fill in ${key}`)
                return
            } 
        }
        const resp = await updateMovie(id,inputs)
        console.log(resp)
        if (!Object.keys(resp).length){
            setMessage("Some Error Happend..")
        }else{
            setMessage("Movie Updated!")
            
        }
    }
    return <div>
        <h1>Edit Movie:</h1>
        <form onSubmit={customSubmit}>
            <label>Movie Name: <input value = {inputs.name} name="name" type = "text" placeholder="name" onChange={handleInput}/></label><br/>
            <label>Image URL: <input value = {inputs.image} name="image" type = "text" placeholder="url" onChange={handleInput}/></label><br/>
            <label>Genres: <input value = {inputs.genres} name="genres" type = "text" placeholder="Comedy, Family..." onChange={handleInput}/></label><br/>
            <label>Rating: <input value = {inputs.rating} name="rating" min="0" max="10" step="0.1" type = "number" placeholder="rating" onChange={handleInput}/></label><br/>
            <label>Summary: <input value = {inputs.summary} name="summary" type = "text" placeholder="summary" onChange={handleInput}/></label><br/>
            <label>Premiered Date: <input value = {inputs.premiered.split("T")[0]} name="premiered" type = "date"  onChange={handleInput}/></label><br/>
            
            {message}<br/>
            <input type="submit" value="Update"/>
            <Link to="../view"><button>Cancel</button></Link>
        </form>
    </div>
}

export default  EditMovie