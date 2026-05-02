import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './auth';

export default function SignUp() {
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Manager'
    });

    const handlechange = (e) => {
        setformdata({
            ...formdata, [e.target.name]: e.target.value
        });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formdata);
            if (data.success) {
                alert("Account created successfully! 🎉");
                navigate("/Login");
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server se connect nahi ho pa raha, backend chalu hai?");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_#1e1b4b,_transparent)] p-5 font-['Inter']">
            <div className="bg-[#1e293b] p-10 rounded-2xl w-full max-w-[450px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10">
                
                <div className="text-center mb-8">
                    <h1 className="text-white text-3xl font-extrabold">
                        Dev<span className="text-[#6366f1]">Logs</span>
                    </h1>
                    <p className="text-[#94a3b8] mt-2">Create your account</p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handlesubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#f8fafc] text-sm font-medium">Full Name</label>
                        <input 
                            className="bg-[#0f172a] border border-[#334155] p-3 rounded-lg text-white outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all"
                            type="text" name="username" placeholder="Kuldeep Singh" onChange={handlechange} required 
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[#f8fafc] text-sm font-medium">Email Address</label>
                        <input 
                            className="bg-[#0f172a] border border-[#334155] p-3 rounded-lg text-white outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all"
                            type="email" name="email" placeholder="name@gmail.com" onChange={handlechange} required 
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[#f8fafc] text-sm font-medium">Role</label>
                        <select 
                            name="role" 
                            onChange={handlechange}
                            className="bg-[#0f172a] border border-[#334155] p-3 rounded-lg text-white outline-none focus:border-[#6366f1] transition-all"
                        >
                            <option value="Manager">Manager</option>
                            <option value="Technical Lead">Technical Lead</option>
                            <option value="Developer">Developer</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[#f8fafc] text-sm font-medium">Password</label>
                        <input 
                            className="bg-[#0f172a] border border-[#334155] p-3 rounded-lg text-white outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all"
                            type="password" name="password" placeholder="*********" onChange={handlechange} required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="bg-[#6366f1] text-white p-3 rounded-lg font-semibold mt-4 hover:bg-[#4f46e5] transition-all active:scale-95"
                    >
                        SignUp
                    </button>
                </form>

                <p className="text-center mt-6 text-[#94a3b8] text-sm">
                    Already have an account? <a href="/login" className="text-[#6366f1] hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
}