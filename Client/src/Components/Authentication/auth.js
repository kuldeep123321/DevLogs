// src/api/auth.js
const BASE_URL = 'http://localhost:3000/api/auth';

export const registerUser = async (formdata) => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
    });
    const data=await response.json();
    if(response.ok){
        return {success: true,user: data.user}
    }
    else{
        return {success:false,}
    }

};

export const loginUser = async (formdata) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
    });
      const data=await response.json();
      
    if(response.ok){
        return {success: true,user: data.user,token:data.token}
    }
    else{
        return {success:false,}
    }
};