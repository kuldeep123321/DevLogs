import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LayoutDashboard, FilePlus, ClipboardCheck, Handshake } from 'lucide-react';
import {useAuth} from "../../Context/AuthContext.jsx";
const Sidebarconfig = [
    { title: "DashBoard", path: "/client/home", roles: ["Manager"], icon: <LayoutDashboard size={20} /> },
    { title: "New Project", path: "/Manager/NewProject", roles: ["Manager"], icon: <FilePlus size={20} /> },
    { title: "Status", path: "/client/status", roles: ["Manager"], icon: <ClipboardCheck size={20} /> },
    { title: "Deals", path: "/client/Deals", roles: ["Manager"], icon: <Handshake size={20} /> },
];

export default function SideBar() {
    const navigate = useNavigate();
    const {user}=useAuth();
    const currentRole=user?.role;
    return (
        <div className="w-[260px] h-screen bg-[#0f172a] text-[#f8fafc] flex flex-col justify-between py-6 px-4 border-r border-white/10 fixed left-0 top-0">
            <div className="flex flex-col gap-8">
                <div className="text-2xl font-extrabold text-[#6366f1] pl-3 tracking-wider cursor-pointer" onClick={() => navigate("/")}>
                    Dev<span className="text-white">Logs</span>
                </div>

                <div className="flex flex-col gap-2">
                    {Sidebarconfig.map((item, index) => (
                        item.roles.includes(currentRole) && (
                            <div 
                                key={index} 
                                onClick={() => navigate(item.path)}
                                className="flex items-center p-3 rounded-xl cursor-pointer text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#6366f1] hover:translate-x-1 transition-all duration-200 group"
                            >
                                <div className="mr-3 group-hover:text-[#6366f1]">{item.icon}</div>
                                <span className="text-[15px] font-medium">{item.title}</span>
                            </div>
                        )
                    ))}
                </div>
            </div>

            <div className="border-t border-white/10 pt-5">
                <div 
                    className="flex items-center p-3.5 bg-[#1e293b] rounded-xl cursor-pointer hover:bg-[#334155] transition-all"
                    onClick={() => navigate("/client/Profile")}
                >
                    <div className="mr-3 text-[#6366f1]">
                        <User size={20} />
                    </div>
                    <span className="text-[15px] font-medium text-white">Profile</span>
                </div>
            </div>
        </div>
    );
}