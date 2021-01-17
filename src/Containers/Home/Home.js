import React from "react";
import { Button, Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

const Home = (props) => {
	return (
		<React.Fragment>
			<h1>Hello World</h1>
			<h3>It's me, Hemel at Home</h3>
			<Button type="primary">Button</Button>
		</React.Fragment>
	);
};

export default Home;
