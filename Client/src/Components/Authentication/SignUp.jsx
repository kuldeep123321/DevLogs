import React from 'react'
import { useState } from 'react';
import "./Signup.css";
import { registerUser } from './auth';
import { Navigate, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate=useNavigate();
  const [formdata,setformdata]=useState({
    username:'',
    email:'',
    password:'',
    role:'Frontend Dev'
  });
  const handlechange=(e)=>{
    setformdata({
        ...formdata,[e.target.name]: e.target.value
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    
    try {
        const data=await registerUser(formdata);
        if (data.success) {
            console.log("Registration successful!", data);
            alert("Account created successfully! 🎉");
            navigate("/Login")
        } else {
            alert(data.message || "Something went wrong");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Server se connect nahi ho pa raha, backend chalu hai?");
    }
};
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Dev<span>Logs</span></h1>
                    <p>Create your account</p>
                </div>
                <form className="auth-form" onSubmit={handlesubmit}>
                    <div className='input-group'>
                        <label>Full Name</label>
                        <input type="text" name="username" placeholder="Kuldeep Singh" onChange={handlechange} required/>
                    </div>
                    <div className='input-group'>
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="name@gmail.com" onChange={handlechange} required/>
                    </div>
                    <div className='input-group'>
                        <label>Role</label>
                        <select name="role" onChange={handlechange}>
                            <option value="Frontend dev">Frontend devloper</option>
                            <option value="Backend dev">Frontend devloper</option>
                            <option value="Full Stack dev">Frontend devloper</option>
                            <option value="devops">Frontend devloper</option>
                        </select>
                    </div>
                    <div className='input-group'>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="*********" onChange={handlechange} required/>
                    </div>
                    <button type="submit" className="auth-btn">SignUp</button>
                </form>
                <p className='auth-footer'>
                    already have an account?<a href="/login">Login here</a>
                </p>
            </div>
        </div>
  )
}
