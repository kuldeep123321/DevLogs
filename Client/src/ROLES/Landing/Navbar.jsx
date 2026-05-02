import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="h-20 flex mx-auto px-6 flex-row justify-between items-center bg-[#0f172a] border-b border-white/10 sticky top-0 z-50">
            <div className="w-1/4 flex flex-row items-center">
                <p className="font-bold text-2xl cursor-pointer text-white" onClick={() => navigate("/")}>
                    Dev<span className="text-[#6366f1]">Logs</span>
                </p>
            </div>

            <div className="w-3/4 flex flex-row justify-end gap-10 items-center">
                <div className="cursor-pointer text-gray-400 hover:text-white transition font-medium" onClick={() => navigate("/features")}>Features</div>
                <div className="cursor-pointer text-gray-400 hover:text-white transition font-medium" onClick={() => navigate("/how-it-works")}>How it works?</div>
                <div className="cursor-pointer text-gray-400 hover:text-white transition font-medium" onClick={() => navigate("/pricing")}>Pricing</div>
                
                <button 
                    className="bg-[#6366f1] text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-[#4f46e5] active:scale-95 transition-all"
                    onClick={() => navigate("/signup")}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}