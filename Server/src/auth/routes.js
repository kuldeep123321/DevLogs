import express from "express";
import { register ,login, refreshtoken} from "./controller.js";
const router=express.Router();
router.post('/register',register);
router.post('/login',login)
router.post('/refreshtoken',refreshtoken);
export default router;