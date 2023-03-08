import React from "react";
import "./taskPublish_style.css";
import TaskItem from "../taskItem/taskItem";

interface TaskPublishProps {
  user: string;
  tasks: any[];
}
export const TaskPublish = ({ user, tasks }: TaskPublishProps) => {
  return (
    <div className="divMain md:flex-row">
      <div className="divSecondary md:grid-cols-2 lg:grid-cols-4 md:flex-row">
        {Array.isArray(tasks) &&
          tasks.map((task) => {
            const updatedComment = task.comments.find(
              (comment: { comment_text: string | string[] }) =>
                comment.comment_text &&
                comment.comment_text.includes(`[Update][${user}]`)
            );
            if (updatedComment) {
              return (
                <TaskItem
                  id={task.id}
                  name={task.name}
                  text_content={updatedComment.comment_text}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default TaskPublish;
