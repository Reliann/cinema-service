import { Link} from 'react-router-dom'; 
import { deleteUser } from '../../DAL/cinemaWsUtils';

const UserCard= (props)=>{
    const generatePerms = ()=>{
        let perms = []
        for(let key in props.user.permissions){
            if (props.user.permissions[key]){
                perms.push(<span key={key}>{key} <br/></span>)
            }
        }
        return perms
    }
    const handleDelete = async()=>{
        const resp = await deleteUser(props.user._id)
        if (resp){
            props.deletedcbk()
        }
    }
    return <div>
        <span>Username: {props.user.username}</span><br/>
        <span>First name: {props.user.info.firstName}</span><br/>
        <span>TimeOut: {props.user.info.sessionTimeOut}</span><br/>
        <span>Creation Date: {props.user.info.createdDate.split("T")[0]}</span><br/>
        Permissions: {generatePerms()}<br/>
        <button onClick={handleDelete}>Delete</button>
        <Link to = {`../edit/${props.user._id}`}><button>Update</button></Link>



    </div>
}

export default UserCard