import "./taskReport_styles.css";
import React from "react";
import copyCardAsText from "../copyCard/copyCardAsText";
import { Status, Comment } from "../../interfaces/clikupapi-response.interface";

interface Task {
  comments: Comment[]; // Note that this is an array of Comment objects
  id: number;
  name: string;
  text_content: string;
  status: Status;
}
interface Props {
  tasks: Task[];
  date: string;
  user: string;
}

const TaskReport: React.FC<Props> = ({ tasks, date, user }) => {
  const sortStatusOrder = {
    "TO DO": 1,
    OPEN: 1,
    "IN PROGRESS": 2,
    "IN REVIEW": 3,
    REVIEWED: 4,
    TESTING: 5,
    DONE: 6,
    BLOCKED: 7,
  };

  const sortedTasks = tasks.sort((a, b) => {
    const aStatusOrder =
      sortStatusOrder[
        a.status?.status?.toLocaleUpperCase() as keyof typeof sortStatusOrder
      ] || 8;
    const bStatusOrder =
      sortStatusOrder[
        b.status?.status?.toLocaleUpperCase() as keyof typeof sortStatusOrder
      ] || 8;
    return aStatusOrder - bStatusOrder;
  });
  return (
    <div className="cardBig md:size-card lg:size-card" onClick={copyCardAsText}>
      <h3 className="cardBig__title">Space EoD</h3>
      <div className="cardBig__date">{date}</div>
      <ol className="cardBig__content">
        {sortedTasks.map(({ id, name, status, comments }) => {
          const updatedComment = comments.find(
            (comment: Comment) =>
              comment.comment_text &&
              comment.comment_text.includes(`[Update][${user}]`)
          )?.comment_text;

          let updateIndex: number;
          let outputString = "";
          if (updatedComment) {
            updateIndex = updatedComment.indexOf(`[Update][${user}]`);
            if (updateIndex !== -1) {
              outputString = updatedComment.substring(
                updateIndex + 11 + user.length
              );
            }
          }
          let statusCircle;

          switch (status.status?.toLocaleUpperCase()) {
            case "IN PROGRESS":
              statusCircle = ":large_orange_circle:";
              break;
            case "TESTING":
              statusCircle = ":large_blue_circle:";
              break;
            case "DONE":
              statusCircle = ":large_green_circle:";
              break;
            case "IN REVIEW":
              statusCircle = ":large_yellow_circle:";
              break;
            case "BLOCKED":
              statusCircle = ":red_circle:";
              break;
            default:
              statusCircle = ":large_purple_circle:";
              break;
          }

          if (updatedComment) {
            return (
              <li key={id}>
                {statusCircle} [{status.status?.toLocaleUpperCase()}]
                <a href={`https://app.clickup.com/t/${id}`}>[{name}]</a>:{" "}
                {outputString}
              </li>
            );
          } else {
            return null;
          }
        })}
      </ol>
    </div>
  );
};

export default TaskReport;
