import React from "react";
import * as classes from "./Button.module.scss";
import { classNames } from "../../utils/utils";

export function Button(props: {
	style?: React.CSSProperties;
	gray?: boolean;
	children?: React.ReactNode;
	onClick?: () => any;
}) {
	return (
		<button
			className={classNames([
				classes.button,
				props.gray ? classes.gray : null,
			])}
			style={props.style}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
