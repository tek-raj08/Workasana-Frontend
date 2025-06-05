
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useFilterStatus } from '../context/StatusFilterContext'
import { useParams } from 'react-router-dom'

const TaskStatusUpdateForm = () => {
    const [status, setStatus] = useState("")
    const {taskId} = useParams()
    const {tasks} = useFilterStatus()

    
    const updatedTask = tasks.find((t) => t?._id === taskId)
    

    useEffect(() => {
        if(updatedTask){
            setStatus(updatedTask?.status)
        }
    }, [updatedTask])

    const handleChange = (e) => {
        if(e.target.checked){
            setStatus("Completed")
        }else{
            ""
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
            const res = await axios.post(BASE_URL + `/tasks/${taskId}`, {status}, {withCredentials: true})
            
        }catch(err){
            console.error(err)
        }
    }

  return (
    <div className='flex justify-center items-center h-screen  bg-gray-600'>
      
      <div className='w-97 p-6 shadow-lg bg-white rounded-md'>
                <h5 className="text-center text-2xl font-medium">Update Status Form</h5>
        <form onSubmit={handleSubmit}>
            <input className='mr-1.5 my-2' type="checkbox" value={status} checked={status.includes("Completed")} onChange={handleChange} name="s" id="status" /><label htmlFor='status'>Completed</label>
            <button type='submit' className='bg-blue-800 text-white rounded p-1 block'>Update Status</button>
        </form>

      </div>
    </div>
  )
}

export default TaskStatusUpdateForm
