import React from "react";
import { useState } from "react";
import "./Login.css";
import { loginUser } from "./auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate=useNavigate();
    const [formdata, setformdata] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handlechange = (e) => {
        setformdata({
            ...formdata, [e.target.name]: e.target.value
        });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
           
            const data=await loginUser(formdata);
            if (data.success) {
                console.log("Login successful!", data);
                // Token localStorage mein save karo
                localStorage.setItem('token', data.token);
                alert("Welcome back! 🎉");
                navigate('/signup');
            } else {
                alert(data.message || "Invalid credentials");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Server se connect nahi ho pa raha, backend chalu hai?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Dev<span>Logs</span></h1>
                    <p>Welcome back, log in to continue</p>
                </div>
                <form className="auth-form" onSubmit={handlesubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@gmail.com"
                            onChange={handlechange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="*********"
                            onChange={handlechange}
                            required
                        />
                    </div>
                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot password?</a>
                    </div>
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="auth-footer">
                    Don't have an account? <a href="/signup">Sign up here</a>
                </p>
            </div>
        </div>
    );
}
