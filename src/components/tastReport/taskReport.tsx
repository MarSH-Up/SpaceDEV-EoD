import './taskReport_styles.css'
import React, { useRef } from 'react';
import copyCardAsText from '../copyCard/copyCardAsText'

interface Task {
  id: number;
  name: string;
  text_content: string;
}

interface Props {
  tasks: Task[];
  date: string;
}

const TaskReport: React.FC<Props> = ({ tasks, date }) => {
  return (
    <div className="cardBig" onClick={copyCardAsText}>
      <h3 className="cardBig__title">Space EoD</h3>
      <div className="cardBig__date">
        {date}
      </div>
      <ol className="cardBig__content">
        {tasks.map(({ id, name, text_content }) => {
          const updateIndex = text_content.indexOf("[Update]");
          let outputString = '';

          if (updateIndex !== -1) {
            outputString = text_content.slice(updateIndex + 8);
          }

          return (
            <li key={id}>[{name}]:{outputString}</li>
          );
        })}
      </ol>
    </div>
  );
};

export default TaskReport;