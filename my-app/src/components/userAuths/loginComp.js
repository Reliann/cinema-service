import { useState, useContext } from 'react'
import {authUser} from '../../DAL/cinemaWsUtils'
import { useNavigate} from 'react-router-dom'; 
import {AuthUserContext} from '../authenticatedUserContext'

const Login = ()=>{
    const [ user,setUser] = useContext(AuthUserContext)
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({username:"", password:""})
    const [message,setMessage ]= useState("")
    

    const handleInput = (e) =>{
        setInputs({...inputs,[e.target.name]:e.target.value})
    }
    const customSubmit = async (e)=>{
        e.preventDefault() 
        const auth  = await authUser(inputs.username, inputs.password)
        
        if(auth.auth){
            setUser(auth.user)
            navigate('/')
        }
        else{
            setMessage(auth.reason)
        }
    }
    return <div>
        <h1>Login</h1>
        <form onSubmit={customSubmit}>
            <label>Username: <input name="username" type = "text" placeholder="username" onChange={handleInput}/></label><br/>
            <label>Password: <input name="password" type ="password" placeholder="password" onChange={handleInput}/></label><br/>
            <input value="Login" type="submit"/><br/>
            {/* <span>New User? <Link to='../auth/signup'>Create an Account!</Link></span><br/> */}
            <span>{message}</span>
        </form>
    </div>
}

export default Login