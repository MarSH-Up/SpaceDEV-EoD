import './taskReport_styles.css'
import React, { useRef } from 'react';
import copyCardAsText from '../copyCard/copyCardAsText'
import { Status } from '../../interfaces/clikupapi-response.interface';

interface Task {
  id: number;
  name: string;
  text_content: string;
  status: Status;
}

interface Props {
  tasks: Task[];
  date: string;
}

const TaskReport: React.FC<Props> = ({ tasks, date }) => {
  return (
    <div className="cardBig md:size-card lg:size-card" onClick={copyCardAsText}>
      <h3 className="cardBig__title">Space EoD</h3>
      <div className="cardBig__date">
        {date}
      </div>
      <ol className="cardBig__content">
        {tasks.map(({ id, name, text_content, status }) => {
          const updateIndex = text_content.indexOf("[Update]");
          let outputString = '';

          if (updateIndex !== -1) {
            outputString = text_content.slice(updateIndex + 8);
          }

          return (
            <li key={id}>[{status.status?.toLocaleUpperCase()}]<a href={`https://app.clickup.com/t/${id}`}>[{name}]</a>:{outputString}</li>
          );
        })}
      </ol>
    </div>
  );
};

export default TaskReport;