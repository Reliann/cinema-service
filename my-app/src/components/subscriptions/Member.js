import { useContext} from 'react'
import { Link} from 'react-router-dom'; 
import { deleteMember } from '../../DAL/cinemaMembersUtils'
import {AuthUserContext} from '../authenticatedUserContext'
import  MemberSubs from './moviesWatched';

const Member = (props)=>{
    const [user] = useContext(AuthUserContext)
    const handleDelete =async ()=>{
        const resp = await deleteMember(props.member._id)
        console.log(resp)
        //if (!Object.keys(resp).length){
            props.deleteCbk()
        
    }
    return <div>
        <span><b>Name: </b>{props.member.name}</span><br/>
        <span><b>Email: </b>{props.member.email}</span><br/>
        <span><b>City: </b>{props.member.city}</span><br/>
        {<MemberSubs memberId = {props.member._id}/>}
        {user.permissions.deleteSubscriptions&&<button onClick={handleDelete}>Delete</button>}
        {user.permissions.updateSubscriptions&&<Link to = {`../edit/${props.member._id}`}><button >Update</button></Link>}

    </div>
}

export default  Member