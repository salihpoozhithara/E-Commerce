import express from 'express'
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js'

// use the express pkg to create router
const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

export default userRouter
