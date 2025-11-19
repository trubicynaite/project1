import { Router } from "express";

import { register, login, autoLogin } from "../controllers/usersController";

const router = Router();

// REGISTER - add new user
router.post('register', register);

// LOGIN - check whether user with given username and password exists
router.post('/login', login);

// LOGIN WITH JWT - user gets logged in automaticcaly if user has valid JWT
router.get('autoLogin', autoLogin);

// EDIT - edit user info
router.patch('/profile',);

export default router;