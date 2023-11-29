import express from 'express'

import UserRoutes from './user.js'
const router = express.Router()

router.get('/',(req,res)=>{
    res.status(200).send(`   Welcome to Backend of Frogot password project`)
})
router.use('/user',UserRoutes)

export default router