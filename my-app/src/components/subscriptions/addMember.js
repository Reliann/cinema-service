import { useContext, useEffect, useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'; 
import { addMember } from '../../DAL/cinemaMembersUtils';
import {AuthUserContext} from '../authenticatedUserContext'

const AddMember = ()=>{
    const [user] = useContext(AuthUserContext)
    const [message,setMessage]=useState("")
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        city:""
    })
    const navigate = useNavigate()
    // will redirect if the user dosn't have permission
    useEffect(()=>{
        if (Object.keys(user).length > 0 && !user.permissions.createSubscriptions){
            navigate('/403')
        }
    })
    const handleInput = (e) =>{
        setInputs({...inputs,[e.target.name]:e.target.value})
    }
    const customSubmit = async (e)=>{
        e.preventDefault()
        for (const key in inputs){
            if(!inputs[key]){
                setMessage(` please fill in ${key}`)
                return
            } 
        }
        const resp = await addMember(inputs)
        console.log(resp)
        if (!Object.keys(resp).length){
            setMessage("Some Error Happend..")
        }else{
            setMessage("New Member Was Added!")
            
        }
    }
    return <div>
        <h1>Add A Member:</h1>
        <form onSubmit={customSubmit}>
            <label>Name: <input name="name" type = "text" placeholder="name" onChange={handleInput}/></label><br/>
            <label>Email: <input name="email" type = "text" placeholder="email" onChange={handleInput}/></label><br/>
            <label>city: <input name="city" type = "text" placeholder="city" onChange={handleInput}/></label><br/>
            
            {message}<br/>
            <input type="submit" value="Save"/>
            <Link to="../view"><button>Cancel</button></Link>
        </form>
    </div>
}

export default  AddMember