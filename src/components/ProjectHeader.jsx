import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useFilterStatus } from '../context/StatusFilterContext';
import FormProject from './FormProject';
import { useNavigate } from 'react-router-dom';
import ProjectFilter from './projectFilter';
import ProjectFormIcon from './ProjectFormIcon';

const ProjectHeader = () => {
    
    

    
  return (
    <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-6">
            <h5 className="font-bold text-2xl">Projects</h5>
            <ProjectFilter/>
          </div>
          <ProjectFormIcon/>
        </div>
  )
}

export default ProjectHeader
