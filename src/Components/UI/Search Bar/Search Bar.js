import React from "react";
import LogoTorre from "../../../Assets/Images/torre-logo.png";
import "./SearchBar.less";
import { Row, Col, Input } from "antd";

const { Search } = Input;

const SearchBar = (props) => {
	return (
		<React.Fragment>
			<Row justify="center" align="middle">
				<Col span={24}>
					<div className="search-bar-container">
						<img
							src={LogoTorre}
							alt={"Logo Torre"}
							style={{ width: "50px" }}
						></img>
						<Search
							placeholder={props.placeholder}
							allowClear
							onSearch={props.onSearch}
							size="large"
							enterButton
							loading={props.loading}
						/>
					</div>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default SearchBar;
