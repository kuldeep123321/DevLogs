import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function NewProject() {
    const [formdata, setformdata] = useState({
        ManagerName: "",
        ManagerId: "",
        ClientName: "",
        ProjectName: "",
        ProjectStartDate: "",
        ProjectDeadLine: "",
        Priority: "Medium",
        ProjectStatus: "Planning",
        TechStack: "",
        PdfLink: "",
        ProjectDescription: "" 
    });

    const [loading, setLoading] = useState(false);

    // Input handle karne ke liye function
    const HandleChange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    };

    // Form submit logic
    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // API call - Backend pe formdata bhej rahe hain
            const response = await api.post("/Manager/NewProject", formdata);
            
            if (response.data?.Success) {
                alert("Project Created Successfully! 🚀");
                // Form reset karne ke liye (Optional)
                setformdata({
                    ManagerName: "", ManagerId: "", ClientName: "", ProjectName: "",
                    ProjectStartDate: "", ProjectDeadLine: "", Priority: "Medium",
                    ProjectStatus: "Planning", TechStack: "", PdfLink: "", ProjectDescription: ""
                });
            } else {
                alert("Nahi hua bhai, backend response check karo.");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Kuch error aa gaya bhai! Network ya Server check karo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-10">
            <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-4xl border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Create New Project</h2>
                    <p className="text-gray-500 mt-2">Naya project add karo aur AI se tasks generate karwao</p>
                </div>
                
                <form onSubmit={HandleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        
                        {/* Manager Details */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-gray-700 mb-2">Manager Name</label>
                            <input 
                                type="text" name="ManagerName" placeholder="Apna naam likho"
                                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition"
                                value={formdata.ManagerName} onChange={HandleChange} required 
                            />
                        </div>

                        {/* Client Name */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-gray-700 mb-2">Client Name</label>
                            <input 
                                type="text" name="ClientName" placeholder="Client ya Company ka naam"
                                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition"
                                value={formdata.ClientName} onChange={HandleChange} required 
                            />
                        </div>

                        {/* Project Name */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-gray-700 mb-2">Project Title</label>
                            <input 
                                type="text" name="ProjectName" placeholder="Project ka kya naam hai?"
                                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition"
                                value={formdata.ProjectName} onChange={HandleChange} required 
                            />
                        </div>

                        {/* Start Date */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-gray-700 mb-2">Start Date</label>
                            <input 
                                type="date" name="ProjectStartDate" 
                                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition"
                                value={formdata.ProjectStartDate} onChange={HandleChange} required 
                            />
                        </div>

                        {/* Deadline */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-gray-700 mb-2">Project Deadline</label>
                            <input 
                                type="date" name="ProjectDeadLine" 
                                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition"
                                value={formdata.ProjectDeadLine} onChange={HandleChange} required 
                            />
                        </div>

                        {/* Priority */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-gray-700 mb-2">Priority Level</label>
                            <select 
                                name="Priority" 
                                className="border border-gray-300 p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition cursor-pointer"
                                value={formdata.Priority} onChange={HandleChange}
                            >
                                <option value="Low">Low (Aaram se)</option>
                                <option value="Medium">Medium (Normal)</option>
                                <option value="High">High (Zaroori)</option>
                                <option value="Urgent">Urgent (Abhi chahiye!)</option>
                            </select>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-gray-700 mb-2">Tech Stack</label>
                            <input 
                                type="text" name="TechStack" placeholder="MERN, Python, Java etc."
                                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition"
                                value={formdata.TechStack} onChange={HandleChange}
                            />
                        </div>

                        {/* Project Description - Full Width */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                Project Description 
                                <span className="bg-indigo-100 text-indigo-600 text-[10px] px-2 py-0.5 rounded-full uppercase">AI Input</span>
                            </label>
                            <textarea 
                                name="ProjectDescription" 
                                rows="5"
                                placeholder="Pura detail likho bhai, AI isse hi tasks banayega..."
                                className="border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition resize-none"
                                value={formdata.ProjectDescription} onChange={HandleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 transform ${
                                loading 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-xl hover:shadow-indigo-200"
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-3">
                                    <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Project...
                                </div>
                            ) : "🚀 Save & Generate Tasks"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}