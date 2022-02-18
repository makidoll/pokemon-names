import React from "react";
import * as classes from "./Error.module.scss";

export function Error(props: { children?: React.ReactNode }) {
	return <div className={classes.error}>{props.children}</div>;
}
