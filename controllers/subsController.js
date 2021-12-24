const router = require('express').Router()
const subsBl = require('../Bls/subsBl')

router.route('/movies').get(async (req, res)=>{
    const movies = await subsBl.getFullMoviesData()
    return res.json(movies)
})
router.route('/:id').get(async (req, res)=>{
    const movies = await subsBl.getSubByMember(req.params.id)
    return res.json(movies)
})


module.exports = router
