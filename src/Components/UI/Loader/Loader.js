import React from "react";
import { Spin } from "antd";

const Loader = (props) => {
	return (
		<Spin
			size="large"
			style={{
				display: "flex",
				flexDirection: "column",
				margin: "50px 0px",
			}}
		></Spin>
	);
};

export default Loader;
