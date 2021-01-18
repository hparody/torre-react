import React from "react";
import NoResult from "../../Components/UI/No Result/No Result";
import Loader from "../../Components/UI/Loader/Loader";
import UsersCard from "../../Components/Users/Users Card";
import { Col,Empty } from "antd";

const SearchUsersResults = (props) => {
    let bodyElement;

    if (props.loading) {
		bodyElement = <Loader></Loader>;
	} else {
		if (props.currentSearch === "") {
			bodyElement = (
				<Empty
					description="Search for an user"
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
								<UsersCard {...elem}></UsersCard>
							</Col>
						</React.Fragment>
					);
				});
			} else {
				bodyElement = (
					<NoResult
						title="No users found"
						subtitle="Sorry, there are no users matching your search."
					></NoResult>
				);
			}
		}
	}
    return bodyElement;
};

export default SearchUsersResults;