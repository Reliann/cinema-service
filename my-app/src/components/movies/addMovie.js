import {useContext, useEffect, useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'; 
import { addNewMovie } from '../../DAL/CinemaSubsUtils';
import {AuthUserContext} from '../authenticatedUserContext'

const AddMovie = ()=>{
    const [user] = useContext(AuthUserContext)
    const [message,setMessage]=useState("")
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
        if (Object.keys(user).length > 0 && !user.permissions.createMovies){
            navigate('/403')
        }
    })
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
        const resp = await addNewMovie(inputs)
        console.log(resp)
        if (!Object.keys(resp).length){
            setMessage("Some Error Happend..")
        }else{
            setMessage("New Movie Was Added!")
            
        }
    }
    return <div>
        <h1>Add A Movie:</h1>
        <form onSubmit={customSubmit}>
            <label>Movie Name: <input name="name" type = "text" placeholder="name" onChange={handleInput}/></label><br/>
            <label>Image URL: <input name="image" type = "text" placeholder="url" onChange={handleInput}/></label><br/>
            <label>Premiered: <input name="premiered" type = "date" onChange={handleInput}/></label><br/>
            <label>Genres: <input name="genres" type = "text" placeholder="Comedy, Family..." onChange={handleInput}/></label><br/>
            <label>Rating: <input name="rating" min="0" max="10" step="0.1" type = "number" placeholder="rating" onChange={handleInput}/></label><br/>
            <label>Summary: <input name="summary" type = "text" placeholder="summary" onChange={handleInput}/></label><br/>
            
            {message}<br/>
            <input type="submit" value="Submit"/>
            <Link to="../view"><button>Cancel</button></Link>
        </form>
    </div>
}

export default  AddMovie