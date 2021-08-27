import { createContext,useContext } from 'react';

export const userSession=createContext({
    user:null,
    isSignedIn:false,
    login: ()=>{  
    },
    logout:()=>{
    },
})

export function useUserSession(){
const {user,isSignedIn,login,logout}=useContext(userSession);
return {user,isSignedIn,login,logout}
}