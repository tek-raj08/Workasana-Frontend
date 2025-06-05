
import TaskFormIcon from './TaskFormIcon';
import TaskFilter from './TaskFilter';

const TaskHeader = () => {
    
  return (
    <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-6">
            <h5 className="font-bold text-2xl">My Tasks</h5>
            <TaskFilter/>
          </div>
          
          <TaskFormIcon/>
        </div>
  )
}

export default TaskHeader
