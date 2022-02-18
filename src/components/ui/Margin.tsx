export function Margin(props: { v?: number; h?: number }) {
	return props.v != null ? (
		<div style={{ marginTop: props.v + "px" }}></div>
	) : props.h != null ? (
		<span
			style={{
				marginLeft: props.h + "px",
			}}
		></span>
	) : null;
}
