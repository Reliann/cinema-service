import { useContext, useEffect, useState} from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'; 
import { editMember, getMember } from '../../DAL/cinemaMembersUtils';
import {AuthUserContext} from '../authenticatedUserContext'

const EditMember = ()=>{
    const [user] = useContext(AuthUserContext)
    const [message,setMessage]=useState("")
    const {id}  = useParams()
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        city:""
    })
    const navigate = useNavigate()
    // will redirect if the user dosn't have permission
    useEffect(()=>{
        if (Object.keys(user).length > 0 && !user.permissions.updateSubscriptions){
            navigate('/403')
        }
    })
    useEffect(()=>{
        const fetchData=async()=>{
            const member = await getMember(id)
            setInputs(member)
        }      
        fetchData()
    },[])
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
        const resp = await editMember(id,inputs)
        console.log(resp)
        if (!Object.keys(resp).length){
            setMessage("Some Error Happend..")
        }else{
            setMessage("Member was updated!")
            
        }
    }
    return <div>
        <h1>Edit a Member:</h1>
        <form onSubmit={customSubmit}>
            <label>Name: <input value={inputs.name} name="name" type = "text" placeholder="name" onChange={handleInput}/></label><br/>
            <label>Email: <input value={inputs.email} name="email" type = "text" placeholder="email" onChange={handleInput}/></label><br/>
            <label>city: <input value={inputs.city} name="city" type = "text" placeholder="city" onChange={handleInput}/></label><br/>
            
            {message}<br/>
            <input type="submit" value="Save"/>
            <Link to="../view"><button>Cancel</button></Link>
        </form>
    </div>
}

export default  EditMember