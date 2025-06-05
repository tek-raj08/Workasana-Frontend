import React from 'react'
import { useEffect } from 'react'
import axios from "axios" 
import {BASE_URL} from "../utils/constants"
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate()
    useEffect(() => {
        const logoutUser = async() => {

            try{
                await axios.post(BASE_URL + "/auth/logout", {}, {withCredentials: true})

                navigate("/auth/login")
            }catch(err){
                console.error("Logout failed:", err)
            }

        }

        logoutUser()
    }, [navigate])

  return (
    <div>
      <h1 className='flex justify-center items-center text-lg font-medium '>Logging out...</h1>
    </div>
  )
}

export default Logout
