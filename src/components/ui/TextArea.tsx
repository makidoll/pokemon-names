import React from "react";
import * as classes from "./TextArea.module.scss";

export function TextArea(props: {
	style?: React.CSSProperties;
	onInput?: (text: string) => any;
	value?: string;
}) {
	return (
		<textarea
			style={props.style}
			className={classes.textarea}
			cols={40}
			rows={10}
			onInput={e => {
				props.onInput(e.currentTarget.value);
			}}
			value={props.value ?? ""}
		></textarea>
	);
}
