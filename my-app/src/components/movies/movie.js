import {useContext} from 'react'
import { Link} from 'react-router-dom'; 
import { deleteMovie } from '../../DAL/CinemaSubsUtils';
import {AuthUserContext} from '../authenticatedUserContext'

const Movie = (props)=>{
    const [user] = useContext(AuthUserContext)
    const handleDelete =async ()=>{
        const resp = await deleteMovie(props.fullMovie.movie._id)
        console.log(resp)
        //if (!Object.keys(resp).length){
            props.deleteCbk()
        
    }
    const genStars = ()=>{
        const full = Math.floor(props.fullMovie.movie.rating)/2
        const stars = String.fromCodePoint("0x2B50 ").repeat(full) 
        return <span>
            {stars}

        </span>
    }
    return <div>
        <div className="movie-card">
            <h4>{`${props.fullMovie.movie.name}, ${props.fullMovie.movie.premiered.split('T')[0].split("-")[0]}`}</h4>
            <span><b>Geners: </b>{`${props.fullMovie.movie.genres}`} </span><br/>
            <span><b>Rating: </b> {genStars()}</span><br/>
            <img alt ="404 NOT FOUND" src = {props.fullMovie.movie.image}/><br/>
            {/* <span><b>Summary: </b><span className="summary-span" dangerouslySetInnerHTML = {{__html:props.fullMovie.movie.summary}}/></span><br/> */}
            <span>{props.fullMovie.subs.length>0?<b>Subscriptions Watched:</b>:"No subs yet!"}</span><br/>
            {props.fullMovie.subs.map((sub)=>{
                return <span key={sub.member._id}><Link to={`../../subs/view/${sub.member._id}`}>{sub.member.name}</Link>, {sub.watchDate.split("T")[0].replaceAll("-","/")}<br/></span>
            })}
            <br/>
            {user.permissions.updateMovies&&<Link to = {`../edit/${props.fullMovie.movie._id}`}><button>Edit</button></Link>}
            {user.permissions.deleteMovies&&<button onClick={handleDelete}>Delete</button>}
        </div>
    </div>
}

export default  Movie