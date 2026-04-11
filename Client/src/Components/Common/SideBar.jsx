import React from 'react'
import {useNavigate} from 'react-router-dom';
import "./SideBar.css"
import {User, LayoutDashboard, FilePlus, ClipboardCheck, Handshake } from 'lucide-react';
const Sidebarconfig=[
    {title: "DashBoard", path:"/client/home",roles:["client"],icon: <LayoutDashboard size={20}/>},
    {title: "New Project", path:"/client/create",roles:["client"],icon: <FilePlus size={20}/>},
    {title: "Status", path:"/client/status",roles:["client"],icon: <ClipboardCheck size={20}/>},
    {title: "Deals", path:"/client/Deals",roles:["client"],icon: <Handshake size={20}/>},
    {title: "Profile", path:"/client/Profile",roles:["client"],icon: <User size={20}/>}
]
export default function SideBar({userroles}) {
    const navigate=useNavigate();
    const profileitem=Sidebarconfig.find(item=>item.title==="Profile");
  return (
    <div className="sidebar">
        <div className="sidebartop">
            <div className="head">DevLogs</div>
            <div className='menu-list'>
                {
                    Sidebarconfig.map((item,index)=>(
                        item.roles.includes(userroles) && (
                            <div key={index} className='menu-box' onClick={()=>navigate(item.path)}>
                            <div className='icon-wrapper'>{item.icon}</div>
                            <span className='title'>{item.title}</span>
                            </div>
                        )
                    ))
                }
            </div>
        </div>
        <div className="sidebarbot">
                <div className="profile" onClick={()=>navigate(profileitem.path)}>
                    <div className='icon-wrapper'>{profileitem.icon}</div>
                            <span className='title'>{profileitem.title}</span> 
                </div>
        </div>
    </div>
  )
}

 SideBar