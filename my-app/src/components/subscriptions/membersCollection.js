import { useContext, useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'; 
import { getMembers } from '../../DAL/cinemaMembersUtils';
import {AuthUserContext} from '../authenticatedUserContext'
import Member from './Member';

const MembersCollection = (props)=>{
    const navigate = useNavigate()
    const [allMembers,setAllMembers] = useState([])
    const [user] = useContext(AuthUserContext)
    const {id} = useParams()
    useEffect(()=>{
        if (Object.keys(user).length > 0 && !user.permissions.viewSubscriptions){
            navigate('/403')
        }
    })
    useEffect(()=>{
        const fetchData =async()=>{
            const data = await getMembers()
        
            if (data){
                if (id){
                    setAllMembers(data.filter((member)=>(member._id===id)))
                }else{
                    setAllMembers(data)
                }
            }else{
                navigate('/404')
            }
        }
        fetchData()
    },[])
    
    return <div>
       <h4>All Members</h4>
       {allMembers.map((member=>(
           <Member key = {member._id} member = {member} deleteCbk = {()=>{setAllMembers(allMembers.filter((mem)=>(member._id!==mem._id)))}}/>
       )))}
    </div>
}

export default  MembersCollection