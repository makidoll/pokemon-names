import React from "react";

export function Title(props: {
	size?: number;
	style?: React.CSSProperties;
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<h1
			className={props.className}
			style={{
				fontSize: props.size + "rem",
				...props.style,
			}}
		>
			{props.children}
		</h1>
	);
}
