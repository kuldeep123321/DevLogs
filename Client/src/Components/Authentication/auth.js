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
        const response=await api.post("/auth/login",formdata);
        const serverData=response.data;
        return {success: true,user: serverData.user,token :serverData.token};
    }
    catch(error){
        return{
            success: false,
            message: error.response?.data?.message || "Invalid credentials"
        };
    } 
};