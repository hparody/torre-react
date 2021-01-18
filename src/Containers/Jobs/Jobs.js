import React from "react";
import { Button } from "antd";
import { Input } from "antd";
import axios from "axios";

async function searchUsers(evt) {
	// console.log(evt);
	const response = await axios({
		method: "post",
		url:
			"https://search.torre.co/opportunities/_search/?offset=0&size=100&aggregate=false",
		headers: {
			"Content-Type": "application/json",
		},
		data: {
			"skill/role": {
				text: "web development",
				experience: "potential-to-develop",
			},
		},
	});
	console.log(response);
}

const Jobs = (props) => {
	return (
		<React.Fragment>
			<h1>Hello World</h1>
			<h3>It's me, Hemel at Jobs</h3>
			<Button type="primary">Button</Button>
		</React.Fragment>
	);
};

export default Jobs;