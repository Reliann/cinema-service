import { Link, Route, Routes} from 'react-router-dom'; 
import Login from './loginComp'
import Signup from './signupComp'

const Auth = ()=>{
    return <div>
        
        <Routes>
            <Route path="login" element = {<Login/>}/>
            <Route path="signup" element = {<Signup/>}/>
        </Routes>
        <br/>
        <span><b>Already Have An Account? </b>
            <Link to="./login">Login</Link><br/>
            <b>New User? </b>
            <Link to="./signup">Signup</Link>
        </span>
    </div>
}

export default Auth