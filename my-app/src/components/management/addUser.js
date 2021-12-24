import {useContext, useEffect, useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'; 
import {createUser} from '../../DAL/cinemaWsUtils'
import {AuthUserContext} from '../authenticatedUserContext'

const AddUser = ()=>{
    const [user] = useContext(AuthUserContext)
    const [message,setMessage ]= useState("")
    // I dont understand why the scase between : matters but sure 
    const [perms, setPerms] = useState({
        "manageUsers": false,
        "viewSubscriptions": false,
        "createSubscriptions": false,
        "deleteSubscriptions": false,
        "updateSubscriptions": false,
        "viewMovies": false,
        "createMovies": false,
        "deleteMovies": false,
        "updateMovies": false
    })
    const [inputs, setInputs] = useState({
        username:"", 
        firstName:"",
        lastName:"",
        sessionTimeOut:"",
    })
    const navigate = useNavigate()
    // will redirect if the user dosn't have permission
    useEffect(()=>{
        if (Object.keys(user).length > 0 && !user.permissions.manageUsers){
            navigate('/403')
        }
    })
    const handleInput = (e) =>{
        if (e.target.type === "checkbox"){
            if(e.target.name.includes("view")){
                setPerms({...perms,[e.target.name]:e.target.checked})
            }
            else if (e.target.name.includes("Subscriptions")){
                setPerms({...perms,[e.target.name]:e.target.checked,viewSubscriptions:true})
            }else{
                setPerms({...perms,[e.target.name]:e.target.checked,viewMovies:true})
            }
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
        const resp = await createUser(inputs, perms)
        if (!Object.keys(resp.user).length){
            setMessage(resp.reason)
        }
        else{
            setMessage("new user saved!")
        }
        
    }

    return <div>
        <h1>Add User</h1>
        <form onSubmit={customSubmit}>
            <label>Username: <input value={inputs.username} name="username" type = "text" placeholder="username" onChange={handleInput}/></label><br/>
            <label>First Name: <input value={inputs.firstName} name="firstName" type ="text" placeholder="First Name" onChange={handleInput}/></label><br/>
            <label>Last Name: <input value={inputs.lastName} name="lastName" type = "text" placeholder="Last Name" onChange={handleInput}/></label><br/>
            <label>Session Time Out: <input value={inputs.sessionTimeOut} name="sessionTimeOut" type = "number" placeholder="Time Out" onChange={handleInput}/></label><br/>
            permissions:<br/>
            <label>view Subscriptions: <input checked={perms.viewSubscriptions} name="viewSubscriptions" type = "checkBox" onChange={handleInput}/></label><br/>
            <label>create Subscriptions: <input checked={perms.createSubscriptions} name="createSubscriptions" type = "checkBox" onChange={handleInput}/></label><br/>
            <label>delete Subscription: <input checked={perms.deleteSubscriptions} name="deleteSubscriptions" type = "checkBox" onChange={handleInput}/></label><br/>
            <label>update Subscription: <input checked={perms.updateSubscriptions} name="updateSubscriptions" type = "checkBox" onChange={handleInput}/></label><br/>
            <label>view Movies: <input checked={perms.viewMovies} name="viewMovies" type = "checkBox" onChange={handleInput}/></label><br/>
            <label>create Movies: <input checked={perms.createMovies} name="createMovies" type = "checkBox" onChange={handleInput}/></label><br/>
            <label>delete Movies: <input checked={perms.deleteMovies} name="deleteMovies" type = "checkBox" onChange={handleInput}/></label><br/>
            <label>Update Movie: <input checked={perms.updateMovies} name="updateMovies" type = "checkBox" onChange={handleInput}/></label><br/>

            <span>{message}</span><br/>
            <input value="Save" type="submit"/>
        </form>
        <Link to="../view"><button>Cancel</button></Link>

    </div>
}

export default  AddUser