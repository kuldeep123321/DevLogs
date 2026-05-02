export const protect=(req,res,next)=>{
    const token=req.headers["authorization"]?.split(" ")[1];
    if(!token){
        return res.json(401).json({message:"login  first"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(error){
        return res.json(401).json({message:"token invalid or expire"});
    }
};
export const allowedroles=(...roles) => {
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"permission nahi hai"});
        }
        next();
    };
};