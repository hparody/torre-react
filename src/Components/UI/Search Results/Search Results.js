import React from "react";
import NoResult from "../No Result/No Result";
import Loader from "../Loader/Loader";
import UsersCard from "../../Users/Users Card";
import JobsCard from "../../Jobs/Jobs Card";
import { Col, Empty } from "antd";

const SearchUsersResults = (props) => {

	const cardElement = (cardOptions) => {
		let component;
		switch (props.searchingFor) {
			case "users":
				component = <UsersCard {...cardOptions}></UsersCard>;
				break;

			case "jobs":
				component = <JobsCard {...cardOptions}></JobsCard>;
				break;

			default:
				component = null;
				break;
		}
		return component;
	};

	let bodyElement;

	if (props.loading) {
		bodyElement = <Loader></Loader>;
	} else {
		if (props.currentSearch === "") {
			bodyElement = (
				<Empty
					description={props.descriptionWhenEmpty}
					style={{ margin: "20px 0px" }}
					imageStyle={{
						height: 150,
					}}
				/>
			);
		} else {
			if (props.currentPageData.length > 0) {
				bodyElement = props.currentPageData.map((elem, index) => {
					return (
						<React.Fragment>
							<Col xs={20} md={10} span={10}>
								{cardElement(elem)}
							</Col>
						</React.Fragment>
					);
				});
			} else {
				bodyElement = (
					<NoResult
						title={props.noResultTilte}
						subtitle={props.noResultSubtitle}
					></NoResult>
				);
			}
		}
	}
	return bodyElement;
};

export default SearchUsersResults;
