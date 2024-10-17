import express from 'express'
import { createUser } from '../controllers/user';

const userRoutes = express.Router();

userRoutes.post('/create', createUser );

export default userRoutes;