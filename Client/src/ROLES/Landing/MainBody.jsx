import React from "react";

export default function HeroSection() {
    return (
        <div className="bg-[#0f172a] min-h-screen text-white relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#6366f1]/10 blur-[120px] rounded-full -z-10"></div>

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
                <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm text-gray-400 mb-8">
                    ✨ <span className="text-white font-medium">v1.0 live</span> — Tracking made simple
                </div>

                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
                    Organize your <br />
                    <span className="bg-gradient-to-r from-[#6366f1] to-sky-400 bg-clip-text text-transparent">
                        Dev Journey
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
                    DevLogs helps developers track daily progress, automate task scheduling with AI, 
                    and keep project logs clean.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 mb-20">
                    <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all active:scale-95">
                        Get Started for Free
                    </button>
                    <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all">
                        View Demo
                    </button>
                </div>

                <div className="w-full max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#1e293b]/50 p-2 shadow-2xl">
                    <div className="rounded-xl overflow-hidden border border-white/5 bg-[#0f172a] aspect-video flex items-center justify-center text-gray-700">
                        <p className="italic font-medium">[ Dashboard Preview ]</p>
                    </div>
                </div>
            </main>
        </div>
    );
}