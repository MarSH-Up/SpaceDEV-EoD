import React from 'react'
import './taskItem_styles.css'

interface Props {
  id: string, 
  name: string, 
  text_content: string, 
}
export const TaskItem: React.FC<Props> = ({id, name, text_content}) => {
  const updateIndex = text_content.indexOf("[Update]");
  let outputString = '';

  if (updateIndex !== -1) {
      outputString = text_content.substr(updateIndex + 8);
  }

  const taskName = 'Example'
  return (
    <div key={id} className="card">
        <h3  className="card__title">Task: <i>{`${name}`}</i></h3>
        <p  className="card__content">{`${outputString}`}</p>
    </div>
  )
}
export default TaskItem;