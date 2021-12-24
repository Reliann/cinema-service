import {Routes,Route } from 'react-router-dom'; 
import {Navbar} from './general/layout'
import UserManagement from './management/usersManagment';
import MoviesMain from './movies/moviesMain';
import MembersMain from './subscriptions/membersMain';

const HomePage = ()=>{
    
    return <div>
        <Navbar/>
        
        <Routes>
            <Route path = "/" element={<div>
                <h1>Welcome!</h1>
                <div>
                This is a management system for movies and subscribers. <br/>
                There is one hard coded Admin, and only he cad add a user.  <br/>
                The added users can sign up with the given username , <br/>
                and they can do stuff with their given permissions. <br/>
                </div>
            </div>

            }/>
            <Route path="userManagement/*" element={<UserManagement/>}/>
            
            <Route path="movies/*" element={<MoviesMain/>}/>
            
            <Route path="subs/*" element={<MembersMain/>}/>
           
        </Routes>
    </div>
}

export default HomePage