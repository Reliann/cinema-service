/*this comp gets a member in props, get his movies watched,
by getting subs by id, then has a button that opens a conmp that lets
user sub the member to a new movie*/

import { useEffect, useState } from "react"
import { Link} from "react-router-dom"
import { getSubsByMember } from '../../DAL/cinemaMembersUtils'
import SubToMovie from "./subToMovie"

const MemberSubs = (props)=>{
    const [movies,setMovies] = useState([])
    const [displayAdd,setDisplayAdd] = useState(false)
    const update=async ()=>{
        const resp = await getSubsByMember(props.memberId)
        setMovies(resp)
    }
    useEffect(()=>{
        update()
    },[])
    return <div>
        <button onClick={()=>setDisplayAdd(!displayAdd)}>Subscribe To Movie</button><br/>
        <b>Movies Watched:</b>
        {movies.map((movie)=><span key={movie.movieId}><Link to={`../../movies/view/${movie.movieId}`}>{movie.name}</Link>, {movie.watchDate.split("T")[0].replaceAll("-","/")}<br/></span>)}
        {displayAdd&&<SubToMovie watchedCbk={()=>{update()}} memberId={props.memberId} movies = {movies?movies:[]}/>}
    </div>
}

export default MemberSubs