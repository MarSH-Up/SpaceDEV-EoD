import "./taskReport_styles.css";
import React, { useRef } from "react";
import copyCardAsText from "../copyCard/copyCardAsText";
import { Status } from "../../interfaces/clikupapi-response.interface";

interface Task {
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
	return (
		<div className="cardBig md:size-card lg:size-card" onClick={copyCardAsText}>
			<h3 className="cardBig__title">Space EoD</h3>
			<div className="cardBig__date">{date}</div>
			<ol className="cardBig__content">
				{tasks.map(({ id, name, text_content, status }) => {
					if (text_content && text_content.includes(`[Update][${user}]`)) {
						let updateIndex: number;
						let outputString = "";
						if (text_content) {
							updateIndex = text_content.indexOf(`[Update][${user}]`);
							if (updateIndex !== -1) {
								outputString = text_content.substring(
									updateIndex + 11 + user.length
								);
							}
						}
						//:red_circle:  :large_orange_circle:   :large_blue_circle:  :large_green_circle:  :large_yellow_circle:
						return (
							<li key={id}>
								[{status.status?.toLocaleUpperCase()}]
								<a href={`https://app.clickup.com/t/${id}`}>[{name}]</a>:
								{outputString}
							</li>
						);
					}
				})}
			</ol>
		</div>
	);
};

export default TaskReport;
