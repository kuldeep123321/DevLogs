import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./auth";

export default function Login() {
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handlechange = (e) => setformdata({ ...formdata, [e.target.name]: e.target.value });

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginUser(formdata);
            if (data.success) {
                alert("Welcome back! 🎉");
                navigate('/dashboard'); 
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (error) {
            alert("Server error!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_#1e1b4b,_transparent)] p-5">
            <div className="bg-[#1e293b] p-10 rounded-2xl w-full max-w-[450px] shadow-2xl border border-white/10">
                <div className="text-center mb-8">
                    <h1 className="text-white text-3xl font-extrabold">Dev<span className="text-[#6366f1]">Logs</span></h1>
                    <p className="text-[#94a3b8] mt-2">Log in to your account</p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handlesubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#f8fafc] text-sm font-medium">Email</label>
                        <input className="bg-[#0f172a] border border-[#334155] p-3 rounded-lg text-white outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all" type="email" name="email" placeholder="name@gmail.com" onChange={handlechange} required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#f8fafc] text-sm font-medium">Password</label>
                        <input className="bg-[#0f172a] border border-[#334155] p-3 rounded-lg text-white outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all" type="password" name="password" placeholder="*********" onChange={handlechange} required />
                    </div>
                    <button type="submit" disabled={loading} className="bg-[#6366f1] text-white p-3 rounded-lg font-semibold mt-4 hover:bg-[#4f46e5] transition-all active:scale-95 disabled:opacity-50">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-center mt-6 text-[#94a3b8] text-sm">
                    Don't have an account? <a href="/signup" className="text-[#6366f1] hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}