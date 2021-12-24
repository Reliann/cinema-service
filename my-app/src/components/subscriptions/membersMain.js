import { useContext, useEffect} from 'react'
import { Link, useNavigate, Route, Routes} from 'react-router-dom'; 
import {AuthUserContext} from '../authenticatedUserContext'
import AddMember from './addMember';
import EditMember from './editMember';
import MembersCollection from './membersCollection';

const MembersMain = ()=>{
    const [user] = useContext(AuthUserContext)
    const navigate = useNavigate()
    // will redirect if the user dosn't have permission
    useEffect(()=>{
        if (Object.keys(user).length > 0 && !user.permissions.viewSubscriptions){
            navigate('/403')
        }
    })
    return <div>
        <h1>Members</h1>
        <Link to="./add"><button>Add New Member</button></Link>
        <Link to="./view"><button>View ALl Members</button></Link>

        <Routes>
            <Route path="add" element={<AddMember/>}/>
            <Route path="view" element={<MembersCollection/>}/>
            <Route path="view/:id" element={<MembersCollection/>}/>
            <Route path="edit/:id" element={<EditMember/>}/>
        </Routes>
    </div>
}

export default  MembersMain