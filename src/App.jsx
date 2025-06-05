import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { StatusFilterProvider } from './context/StatusFilterContext'
import FormProject from './components/FormProject'
import FormTasks from './components/FormTasks'
import ProjectDetails from './components/ProjectDetails'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import TaskDetails from './components/TaskDetails'
import TaskStatusUpdateForm from './components/TaskStatusUpdateForm'
import Teams from './pages/Teams'
import TeamForm from './components/TeamForm'
import TeamDetails from './components/TeamDetails'
import AddMemberForm from './components/AddMemberForm'
import Report from './pages/Report'

function App() {
  
  return (
    <>
    <StatusFilterProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/form-project' element={<FormProject/>} />
          <Route path='/form-task' element={<FormTasks/>} />
          <Route path='/project-details/:projectId' element={<ProjectDetails/>} />
          <Route path='/projects' element={<Projects/>} />
          <Route path='/tasks' element={<Tasks/>} />
          <Route path='/task-details/:taskId' element={<TaskDetails/>} />
          <Route path='/task-status-update/:taskId' element={<TaskStatusUpdateForm/>} />
          <Route path='/teams' element={<Teams/>} />
          <Route path='/team-form' element={<TeamForm/>} />
          <Route path='/team-details/:teamId' element={<TeamDetails/>} />
          <Route path='/add-member-form/:teamId' element={<AddMemberForm/>}/>
          <Route path='/reports' element={<Report/>}/>
        </Routes>
        
      </Router>
      </StatusFilterProvider>
    </>
  )
}

export default App
