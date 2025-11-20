import { Router } from "express";

import { register, login, autoLogin, editUser } from "../controllers/usersController";

import { verifyJWT } from "../middleware/auth";

const router = Router();

// REGISTER - add new user
router.post('register', register);

// LOGIN - check whether user with given username and password exists
router.post('/login', login);

// LOGIN WITH JWT - user gets logged in automaticcaly if user has valid JWT
router.get('autoLogin', verifyJWT, autoLogin);

// EDIT - edit user info
router.patch('/profile', verifyJWT, editUser);

export default router;