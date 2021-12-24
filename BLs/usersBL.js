const { findByIdAndUpdate } = require('../models/usersModel')
const userModel = require('../models/usersModel')
const permUtils = require('./permissionsUtil')
const usersInfoUtils = require('./usersInfoUtils')


const updateNewUser = (data)=>{
    return new Promise((resolve,reject)=>{
        userModel.findOne({username:data.username},(err,user)=>{
            if(user){            //if user found
                if (!user.password) {   // if user dosent have passward already
                    if (!data.password){// if the new passward is not valid
                        resolve({auth:false, reason:"please choose a password"})
                    }
                    else{   //else update it
                        userModel.findOneAndUpdate({username:data.username},{password:data.password},(err,user)=>{
                            if (err){
                                reject(err) 
                            }else{
                                toFullUser(user.toObject()).then((value)=>{resolve({auth:true,user:value})})
                            }
                        })
                    }
                }
                else{ // if user have passward
                    resolve({auth:false, reason:"You already have an account"})
                }
            }   
            else{   // if no user found
                err? reject(err) : resolve({auth:false, reason:"No username was found"})  //TODO: what to do ?
            }

        })
        
    })
}
const authenticateUser=(username,password)=>{
    return new Promise((resolve,reject)=>{
        userModel.findOne({username:username,password:password},(err,user)=>{
            err&&reject(err)
            if (user){
                toFullUser(user.toObject()).then(value=>{resolve({auth:true,user:value})})
                
            }else{
                resolve({auth:false, reason:"Wrong username or password"})
            }
        })
    })
}
const createNewUser = (data)=>{
    let new_user = new userModel({
        username:data.info.username
    })
    return new Promise((resolve,reject)=>{
        userModel.findOne({username:data.info.username},(err,user)=>{
            err&&reject(err)
            if(!user){
                new_user.save((err,user)=>{
                    if (err){reject(err)}
                    else{
                        saveFullUser(user.toObject(),data.info,data.permissions).then((value=>{resolve({user:value})}))
                    }
                })
            }
            else{
                resolve({user:{},reason:"Username exists"})
            }
        })
        
    })
}

// attempt with async function
const deleteUser= async (id)=>{
    let stat= await userModel.findByIdAndDelete(id)
    if (stat){
        stat = stat && deleteFullUser(id)
        if (stat){
            return true
        }
    }
    return false

}
// helpers:
const deleteFullUser = async (id)=>{
    const info = await usersInfoUtils.deleteEntry(id)
    const perm = await permUtils.deleteEntry(id)
    return info && perm
}

const toFullUser = async (user)=>{
    const info = await usersInfoUtils.getUserInfo(user._id)
    const perm = await permUtils.getUserPermissions(user._id)
    delete user["password"]
    return {...user,info:info,permissions:perm}
}
const saveFullUser = async (user,info,perms)=>{
    info = await usersInfoUtils.addEntery(user._id,info)
    perms = await permUtils.addEntery(user._id,perms)
    return {...user,info:info,permissions:perms}
}
const getAllUsers = ()=>{
    return new Promise((resolve,reject)=>{
        userModel.find({},'-password',(err, users)=>{   // omit the password from the returned data
            if (err){
                reject(err)
            }else{
                if(users.length){
                    users = users.map(user=>{
                        return toFullUser(user.toObject())
                    })
                    Promise.all(users).then((val) => {resolve(val)})
                }

            }
        })
    })
}

const getUser = async (id)=>{
    const user = await userModel.findOne({_id:id})
    if(user)
        return toFullUser(user.toObject())
    else
        return {}
}

const updateUser= async (id,data )=>{
    const user = await userModel.findByIdAndUpdate({_id:id},{username:data.username},{new:true})
    if (user){
        return saveFullUser(user.toObject(),data.info,data.permissions)
    }else{
        return {}
    }
}

module.exports={
    updateNewUser,
    authenticateUser,
    createNewUser,
    getAllUsers,
    deleteUser,
    getUser,
    updateUser
}