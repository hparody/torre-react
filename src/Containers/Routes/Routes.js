import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Home from "../Home/Home";
import NavBar from "../../Components/UI/NavBar";
import {
	HomeOutlined,
	UserOutlined,
	AimOutlined,
	InfoCircleOutlined,
} from "@ant-design/icons";

const navBarConfig = {
	defaultSelected: "home",
	options: [
		{
			key: "home",
			text: "Home",
			path: "/",
			icon: <HomeOutlined />,
		},
		{
			key: "users",
			text: "Users",
			path: "/users",
			icon: <UserOutlined />,
		},
		{
			key: "jobs",
			text: "Jobs",
			path: "/jobs",
			icon: <AimOutlined />,
		},
		{
			key: "about",
			text: "About",
			path: "/about",
			icon: <InfoCircleOutlined />,
		},
	],
};

const Routes = (props) => {
	return (
		<React.Fragment>
			<Router>
				<NavBar config={navBarConfig}></NavBar>
				<Switch>
					<Route path="/" exact component={Home} />
					<Redirect to="/" />
				</Switch>
			</Router>
		</React.Fragment>
	);
};

export default Routes;
