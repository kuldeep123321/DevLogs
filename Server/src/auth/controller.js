import { createUserInDb, findrefreshtokenindb, findUserByEmailInDb,refreshtokenindb } from './service.js';
import { hashPassword } from './utils.js';
import { comparePassword, generateToken} from './utils.js';
export const register = async (req, res) => {
    try {
        const { username, email, password,role } = req.body;
        const userExists = await findUserByEmailInDb(email);
        if (userExists) return res.status(400).json({ message: "User already exists" });
        const hashedpass=await hashPassword(password);
        const newUser = await createUserInDb(username, email, hashedpass,role);
        res.status(201).json({ message: "User Registered!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await findUserByEmailInDb(email);
        if (!userExist) {
            return res.status(404).json({
                message: "User does not exist plz signup first"
            });
        }

        const validuser = await comparePassword(password, userExist.password);
        if (!validuser) {
            return res.status(401).json({ message: "wrong credentials" });
        }

        const token = generateToken(userExist.id,userExist.role);

        const expiresat = new Date();
        expiresat.setDate(expiresat.getDate() + 7);

        const refreshtoken = await refreshtokenindb(userExist.id, expiresat);
        res.cookie("refreshtoken",refreshtoken,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7*24*60*60*100
        });
        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: userExist.id,
                username: userExist.username,
                email: userExist.email,
                role: userExist.role
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
export const refreshtoken=async(req,res)=>{
    const refreshtoken=req.cookies.refreshtoken;
    if(!refreshtoken){
        return res.status(401).json({message: "no refresh token"});
    }
    try{
        const tokenData=await findrefreshtokenindb(refreshtoken);
        if(!tokenData){
            return res.status(401).json({"message":"token invalid ya expire"});
        }
        const newAccessToken=generateToken(tokenData.user_id,tokenData.role);
        res.status(200).json({
            accesstoken:newAccessToken
        });
    }catch(error){
        res.status(500).json({error:error.message});
    }
};