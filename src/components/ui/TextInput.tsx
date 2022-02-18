import React from "react";
import * as classes from "./TextInput.module.scss";

export function TextInput(props: {
	onInput?: (text: string) => any;
	style?: React.CSSProperties;
	type?: React.HTMLInputTypeAttribute;
	value?: string;
	placeholder?: string;
}) {
	return (
		<input
			className={classes.input}
			style={props.style}
			type={props.type}
			value={props.value}
			placeholder={props.placeholder}
			onInput={e => {
				props.onInput(e.currentTarget.value);
			}}
		/>
	);
}
