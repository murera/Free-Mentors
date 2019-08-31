import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

// mounting connecting a route to a router.
const user_controller = new UserController();
// signup endpoint
router.post('/auth/signup', user_controller.signUp);
// signin endpoint
router.post('/auth/signin', user_controller.signIn);
// admin can get all users.
router.get('/users', authorisation.checkAdmin, user_controller.GetAllUsers);
