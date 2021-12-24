const jf = require('jsonfile')
const infosFile = './system data/usersInfo.json'


const getUserInfo = (id)=>{
    return new Promise((resolve,reject)=>{
            jf.readFile(infosFile,(err, obj)=>{
                err&&reject(err)
                if (id in obj){
                    resolve(obj[id])
                }
                else{
                    reject("ID dosen't exist in dict")
                }
            })
        })
    }

const addEntery = (id, data)=>{
    return new Promise((resolve,reject)=>{
        jf.readFile(infosFile,(err, obj)=>{
            if (err) {reject(err)}
            else{
                obj[id] = {
                    "firstName": data.firstName,
                    "lastName":data.lastName,
                    "createdDate":new Date(),     
                    "sessionTimeOut" : data.sessionTimeOut
                }
                jf.writeFile(infosFile, obj, { spaces: 2, EOL: '\r\n' },(err)=>{
                    err?reject(err):resolve(obj[id])
                })
            }
        })
    })
}

const deleteEntry = (id)=>{
    return new Promise((resolve,reject)=>{
        jf.readFile(infosFile,(err, obj)=>{
            if (err) {reject(err)}
            else{
                delete obj[id] 
                jf.writeFile(infosFile, obj, { spaces: 2, EOL: '\r\n' },(err)=>{
                    err?reject(err):resolve(true)
                })
            }
        })
    })
}


module.exports = {getUserInfo,addEntery,deleteEntry}