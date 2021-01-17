import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./NavBar.less";

const { Header } = Layout;

const NavBar = (props) => {
	return (
		<React.Fragment>
			<Header>
				<Menu
					theme="light"
					mode="horizontal"
					selectedKeys={[props.selectedTab]}
				>
					{props.config.options.map((elem) => {
						return (
							<Menu.Item key={elem.key} icon={elem.icon}>
								<Link to={elem.path}>{elem.text}</Link>
							</Menu.Item>
						);
					})}
				</Menu>
			</Header>
		</React.Fragment>
	);
};

export default NavBar;
