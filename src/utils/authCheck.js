import axios from "axios"
import { BASE_URL } from "./constants"

export const authCheck = async() => {
    try{
        await axios.get(`${BASE_URL}/auth/check`, {withCredentials: true})
        
        return { isAuthenticated: true };
    }catch(err){
        return { isAuthenticated: false };
    }

   
}





