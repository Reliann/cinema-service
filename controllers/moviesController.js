const router = require('express').Router()
const moviesBl = require('../BLs/moviesBl')

router.route('/').post(async (req,res)=>{
    const movie = await moviesBl.addNewMovie(req.body)
    return res.json(movie)
})

router.route('/:id').delete(async (req,res)=>{
    const resp = await moviesBl.deleteMovie(req.params.id)
    return res.json(resp)
})

router.route('/:id').put(async (req,res)=>{
    const resp = await moviesBl.updateMovie(req.params.id, req.body)
    return res.json(resp)
})
router.route('/:id').get(async (req,res)=>{
    const resp = await moviesBl.getMovie(req.params.id)
    return res.json(resp)
})
router.route('/').get(async (req,res)=>{
    const resp = await moviesBl.getAllMovies()
    return res.json(resp)
})

module.exports = router
