import { faChartColumn, faGears, faPeopleGroup, faProjectDiagram, faTableColumns, faTasks } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    

  return (
    
      <div className='w-50  h-auto bg-cyan-200'>
        <h5 className='m-10 mt-1.5 mb-8 text-cyan-600 font-bold text-2xl'>workasana</h5>
        <Link to={"/dashboard"}><div className='mb-5 ms-10 flex items-center gap-1'>
            <FontAwesomeIcon icon={faTableColumns} />
            <p>Dashboard</p>
        </div>
        </Link>

        <Link to={"/projects"}>
        <div className='mb-5 ms-10 flex  items-center gap-1'>
            <FontAwesomeIcon icon={faProjectDiagram} />
            <p>Projects</p>
        </div>
        </Link>

        <Link to={"/tasks"}>
        <div className='mb-5 ms-10 flex  items-center gap-1'>
            <FontAwesomeIcon icon={faTasks} />
            <p>Tasks</p>
        </div>
        </Link>

        <Link to={"/teams"}>
        <div className='mb-5 ms-10 flex  items-center gap-1'>
            <FontAwesomeIcon icon={faPeopleGroup} />
            <p>Teams</p>
        </div>
        </Link>

        <Link to={"/reports"}>
        <div className='mb-5 ms-10 flex  items-center gap-1'>
            <FontAwesomeIcon icon={faChartColumn} />
            <p>Reports</p>
        </div>
        </Link>

        <div className='mb-5 ms-10 flex  items-center gap-1 cursor-pointer'>
            <FontAwesomeIcon icon={faGears} />
            <p>Setting</p>
        </div>
      </div>
    
  )
}

export default Sidebar
