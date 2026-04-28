import express from "express";
import { register ,login, refreshtoken} from "./controller.js";
import { protect,allowedroles } from "../middlewares/Rolebased.js";
const router=express.Router();
router.post('/register',register);
router.post('/login',login)
router.post('/refreshtoken',refreshtoken);
router.get("/profile",protect,allowedroles("admin"),(req,res)=>{
    res.json({message:"profile",user:req.user});
});
export default router;