export function Border(props: {
	vertical?: string;
	height?: number;
	horizontal?: string;
	width?: number;
}) {
	return (
		<div
			style={{
				borderLeft: props.vertical,
				height: props.height ? props.height + "px" : null,
				borderTop: props.horizontal,
				width: props.width ? props.width + "px" : null,
			}}
		></div>
	);
}
