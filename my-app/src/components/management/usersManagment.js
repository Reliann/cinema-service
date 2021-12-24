import { useContext, useEffect} from 'react'
import { Link, useNavigate , Route, Routes} from 'react-router-dom'; 
import {AuthUserContext} from '../authenticatedUserContext'
import AddUser from './addUser'
import UsersCollection from './viewUsers';
import EditUser from './editUser';

const UserManagement = ()=>{
    const [user] = useContext(AuthUserContext)
    const navigate = useNavigate()
    // will redirect if the user dosn't have permission
    useEffect(()=>{
        if (Object.keys(user).length > 0 && !user.permissions.manageUsers){
            navigate('/403')
        }
    })
    return <div>
        <h1>Hello Admin!</h1>
        <Link to="./add"><button>Add User</button></Link>
        <Link to="./view"><button>View All Users</button></Link>
        <Routes>
            <Route path="add" element={<AddUser/>}/>
            <Route path="view" element={<UsersCollection/>}/>
            <Route path="edit/:id" element={<EditUser/>}/>
        </Routes>
    </div>
}

export default  UserManagement