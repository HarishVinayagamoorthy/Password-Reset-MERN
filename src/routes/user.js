import express from 'express'
import UserController from '../controllers/userController.js'
const router = express.Router()


router.post('/signup',UserController.create)

router.post('/signin',UserController.login)

router.post ('/resetpassword',UserController.resetpassword)
router.post('/reset-password',UserController.passwordtoken)
export default router