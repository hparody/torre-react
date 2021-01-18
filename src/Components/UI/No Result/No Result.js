import React from "react";
import { Result } from "antd";

const NoResult = (props) => {
	return (
		<Result
			status="404"
			title={props.title}
			subTitle={props.subtitle}
			extra={props.extra}
		/>
	);
};

export default NoResult;
