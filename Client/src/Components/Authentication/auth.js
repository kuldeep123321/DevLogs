// src/api/auth.js
import api from "../../api";
export const registerUser = async (formdata) => {
    try{
    const {data}=await api.post("/auth/register",formdata);
    return {success: true,user: data.user};
   }catch(error){
    return{
        success:false,
        message: error.response?.data?.message || "something went wrong"
    };
   }
};

export const loginUser = async (formdata) => {
    try{
        const {data}=await api.post("/auth/login",formdata);
        localStorage.setItem("accessToken",data.token);
        localStorage.setItem("role",data.user.role);
        return {success: true,user: data.user,token :data.token};
    }
    catch(error){
        return{
            success: false,
            message: error.response?.data?.message || "Invalid credentials"
        };
    } 
};