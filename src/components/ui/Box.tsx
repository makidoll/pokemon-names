import React from "react";
import { classNames } from "../../utils/utils";
import * as classes from "./Box.module.scss";

export function Box(props: {
	children?: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
}) {
	return (
		<div
			className={classNames([classes.box, props.className])}
			style={props.style}
		>
			{props.children}
		</div>
	);
}
