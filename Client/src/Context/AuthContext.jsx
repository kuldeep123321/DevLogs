import react, {createContext,useState,useContext,useEffect} from 'react';
const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const[user,setuser]=useState(null);
    useEffect(()=>{
        const savedUser=localStorage.getItem("user");
        if(savedUser){
            setuser(JSON.parse(savedUser));
        }
    },[]);
    const login=(userData)=>{
        setuser(userData);
        localStorage.setItem("user",JSON.stringify(userData));
    };
    const logout=()=>{
        setuser(null);
        localStorage.removeItem("user");
    }
    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth=()=>useContext(AuthContext);