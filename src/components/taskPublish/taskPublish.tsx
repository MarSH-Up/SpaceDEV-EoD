import React from 'react'
import './taskPublish_style.css'
import TaskItem from '../taskItem/taskItem';

export const TaskPublish = ({ tasks }: { tasks: any[] }) => {
  return (
    <div className="divMain md:flex-row">
      <div className="divSecondary md:grid-cols-2 lg:grid-cols-4 md:flex-row">
        {Array.isArray(tasks) && tasks.map((task) => (
            <TaskItem
              id={task.id}
              name={task.name}
              text_content={task.text_content}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskPublish; 