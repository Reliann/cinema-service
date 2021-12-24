const router = require('express').Router()
const membersBl = require('../BLs/membersBl')
const subsBl = require('../BLs/subsBl')

router.route('/').get(async(req,res)=>{
    // get all members
    const resp = await membersBl.getAllMembers()
    return res.json(resp)
})
router.route('/:id').get(async(req,res)=>{
    // get a member
    const resp = await membersBl.getMember(req.params.id)
    return res.json(resp)
})

router.route('/').post(async(req,res)=>{
    // add new member
    const resp = await membersBl.addMember(req.body)
    return res.json(resp)
})

router.route('/:id').put(async(req,res)=>{
    // update member
    const resp = await membersBl.updateMember(req.params.id,req.body)
    return res.json(resp)
})

router.route('/:id').delete(async(req,res)=>{
    // delete member
    const resp = await membersBl.deleteMember(req.params.id)
    return res.json(resp)
})

// for client convience....
router.route('/:id/:movieId').post(async(req,res)=>{
    // subscribe to new movie
    const resp = await subsBl.addNewSubscription(req.params.id, req.params.movieId, req.body)
    return res.json(resp)
})

router.route('/:id/:movieId').delete(async (req,res)=>{
    //remove subscription
    const resp = await subsBl.removeSubscription(req.params.id,req.params.movieId)
    return res.json(resp)
})




module.exports = router
