const router = require('express').Router()
const usersBL = require('../BLs/usersBL')

router.route('/auth').put(async (req,res)=>{
    const user = await usersBL.updateNewUser(req.body)
    return res.json(user)
})

router.route('/auth').post(async (req,res)=>{
    const user = await usersBL.authenticateUser(req.body.username, req.body.password)
    return res.json(user)
})

router.route('/').post(async (req,res)=>{
    const user = await usersBL.createNewUser(req.body)
    return res.json(user)
})
router.route('/').get(async (req,res)=>{
    const users = await usersBL.getAllUsers()
    return res.json(users)
})
router.route('/:id').delete(async (req,res)=>{
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        return res.status(400).json({status: 400, message: "invalid ID"})
    }else{
        const stat = await usersBL.deleteUser(req.params.id)
        if (stat) {
            return res.json({})
        }else{
            return res.sendStatus('404')
        }
        
    }
    
})
router.route('/:id').get(async (req,res)=>{
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        return res.status(400).json({status: 400, message: "invalid ID"})
    }else{
        const stat = await usersBL.getUser(req.params.id)
        if (stat) {
            return res.json(stat)
        }else{
            return res.sendStatus('404')
        }
        
    }
})

router.route('/:id').put(async (req,res)=>{
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        return res.status(400).json({status: 400, message: "invalid ID"})
    }else{
        const stat = await usersBL.updateUser(req.params.id,req.body)
            return res.json(stat)
    }
})

module.exports = router