import React from "react";
import "./taskItem_styles.css";

interface Props {
	id: string;
	name: string;
	text_content: string;
	user: string;
}
export const TaskItem: React.FC<Props> = ({ id, name, text_content, user }) => {
	let updateIndex: number;
	let outputString = "";
	if (text_content) {
		updateIndex = text_content.indexOf(`[Update][${user}]`);
		if (updateIndex !== -1) {
			outputString = text_content.substring(updateIndex + 10 + user.length);
		}
	}
	return (
		<div key={id} className="card md:card-adaption lg:card-adaption">
			<h3 className="card__title">
				Task: <i>{`${name}`}</i>
			</h3>
			<p className="card__content">{`${outputString}`}</p>
		</div>
	);
};
export default TaskItem;
