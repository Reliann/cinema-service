const jf = require('jsonfile')
const permissionsFile = './system data/permissions.json'


const getUserPermissions = (id)=>{
    return new Promise((resolve,reject)=>{
            jf.readFile(permissionsFile,(err, obj)=>{
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
        jf.readFile(permissionsFile,(err, obj)=>{
            if (err) {reject(err)}
            else{
                obj[id] = {
                    //if one of the values was undefined its false
                    "manageUsers": data.manageUsers || false,
                    "viewSubscriptions":  data.viewSubscriptions || false,
                    "createSubscriptions":  data.createSubscriptions || false,
                    "deleteSubscriptions": data.deleteSubscriptions || false,
                    "updateSubscriptions": data.updateSubscriptions || false,
                    "viewMovies": data.viewMovies || false,
                    "createMovies": data.createMovies || false,
                    "deleteMovies": data.deleteMovies || false,
                    "updateMovies":data.updateMovies || false
                }
                
                jf.writeFile(permissionsFile, obj, { spaces: 2, EOL: '\r\n' },(err)=>{
                    err?reject(err):resolve(obj[id])
                })
            }
        })
    })
}

const deleteEntry = (id)=>{
    return new Promise((resolve,reject)=>{
        jf.readFile(permissionsFile,(err, obj)=>{
            if (err) {reject(err)}
            else{
                delete obj[id] 
                jf.writeFile(permissionsFile, obj, { spaces: 2, EOL: '\r\n' },(err)=>{
                    err?reject(err):resolve(true)
                })
            }
        })
    })
}

module.exports = {getUserPermissions, addEntery, deleteEntry}