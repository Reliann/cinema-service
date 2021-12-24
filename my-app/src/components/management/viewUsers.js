import { useState, useEffect, useContext} from 'react'
import { useNavigate} from 'react-router-dom'; 
import {AuthUserContext} from '../authenticatedUserContext'
import {getUsers} from '../../DAL/cinemaWsUtils'
import UserCard from './userDisplay';
const UsersCollection= ()=>{
    const navigate = useNavigate()
    const [user] = useContext(AuthUserContext)
    const [allUsers,setallUsers ]= useState([])

    useEffect(()=>{
        if (Object.keys(user).length > 0 && !user.permissions.manageUsers){
            navigate('/403')
        }
    })
    useEffect(()=>{
        const fetchData = async()=>{
            const data = await getUsers()
            setallUsers(data)
        }
        fetchData()
    },[])
    return <div>
        <h2>All Users</h2>
        {/* user cant delete himself... */}
        {allUsers.flatMap(oneUser=>{
            if(user._id !== oneUser._id){
                return <UserCard key = {oneUser._id} user={oneUser} deletedcbk={()=>{setallUsers(allUsers.filter((u)=>(oneUser._id!==u._id)))}}/>
            }
        })}
    </div>
}

export default UsersCollection