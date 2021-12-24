import { useContext, useEffect} from 'react'
import { Link, useNavigate, Route, Routes} from 'react-router-dom'; 
import {AuthUserContext} from '../authenticatedUserContext'
import AddMovie from './addMovie';
import EditMovie from './editMovie';
import MoviesCollection from './moviesCollection';

const MoviesMain = ()=>{
    const [user] = useContext(AuthUserContext)
    const navigate = useNavigate()
    // will redirect if the user dosn't have permission
    useEffect(()=>{
        if (Object.keys(user).length > 0 && !user.permissions.viewMovies){
            navigate('/403')
        }
    })
    return <div>
        <h1>Movies</h1>
        <Link to="./add"><button>Add New Movie</button></Link>
        <Link to="./view"><button>View ALl Movies</button></Link>

        <Routes>
            <Route path="view" element={<MoviesCollection/>}/>
            <Route path="view/:id" element={<MoviesCollection/>}/>
            <Route path="edit/:id" element={<EditMovie/>}/>
            <Route path="add" element={<AddMovie/>}/>
        </Routes>
        
    </div>
}

export default  MoviesMain