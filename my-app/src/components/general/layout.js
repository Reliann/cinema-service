import {useContext, useEffect} from 'react'
import { Link,useNavigate} from 'react-router-dom'; 
import {AuthUserContext} from '../authenticatedUserContext'

const Navbar = ()=>{
    const [user, setUser] = useContext(AuthUserContext)
    const navigate = useNavigate()
    // nav will redirect if no user is saved...
    useEffect(()=>{
        if (Object.keys(user).length === 0){
            navigate('/auth')
        }
    })

    return <div className="navbar">
        <span><b>{user.username}</b></span>
        <button onClick={()=>{setUser({});navigate('/auth')}}>Logout</button>|
        {Object.keys(user).length > 0&&user.permissions.viewSubscriptions&&<Link to ="/subs/view"> Subscriptions </Link>}|
        {Object.keys(user).length > 0&&user.permissions.viewMovies&&<Link to ="/movies/view"> Movies </Link>}|
        {Object.keys(user).length > 0&&user.permissions.manageUsers&&<Link to ="/UserManagement/view"> Users Management </Link>}|

    </div>
}

export {Navbar}