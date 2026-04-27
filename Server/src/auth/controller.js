import { createUserInDb, findUserByEmailInDb,refreshtokenindb } from './service.js';
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

        const token = generateToken(userExist.id);

        const expiresat = new Date();
        expiresat.setDate(expiresat.getDate() + 7);

        const refreshtoken = await refreshtokenindb(userExist.id, expiresat);

        res.status(200).json({
            message: "Login successful!",
            token,
            refreshtoken,
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