import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Empty } from "antd";
import SearchBar from "../../Components/UI/Search Bar/Search Bar";
// import NoResult from "../../Components/UI/No Result/No Result";
// import Loader from "../../Components/UI/Loader/Loader";
import Requests from "../../Components/Requests/Requests";
import UsersResults from "../../Components/Users/Search Results";
// import UsersCard from "../../Components/Users/Users Card";

const PAGE_SIZE  = 20;

const Users = (props) => {
	const [loading, setLoading] = useState(false);
	const [currentSearch, setCurrentSearch] = useState("");
	const [allData, setAllData] = useState([]);
	const [currentPageData, setCurrentPageData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	function searchUsers(search) {
		console.log("Searching: " + search);
		setCurrentSearch(search);
		if (search === "") {
			setAllData([]);
			setCurrentPageData([]);
			setLoading(false);
		} else {
			setLoading(true);
			const searchConfigs = {
				searchType: "users",
				search: search,
				offset: 0,
			};
			Requests.searchMultiple(searchConfigs)
				.then((res) => {
					setAllData(res.results);
					setCurrentPage(1);
					if (res.results.length > 0) {
						if (res.results.length > PAGE_SIZE) {
							const multiplier =
								currentPage === 1 ? 0 : (currentPage - 1) * PAGE_SIZE;
							setCurrentPageData(
								res.results.slice(multiplier, multiplier + PAGE_SIZE)
							);
						} else {
							setCurrentPageData(res.results);
						}
					} else {
						setCurrentPageData([]);
					}
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
	};

	const searchBarConfigs = {
		loading: loading,
		placeholder: "Search for someone...",
		onSearch: searchUsers,
	};

	return (
		<React.Fragment>
			<Row justify="center" align="middle">
				<Col span={20}>
					<SearchBar {...searchBarConfigs}></SearchBar>
					<Divider plain></Divider>
				</Col>
			</Row>
			<Row justify="center" align="middle" className="users-container">
				<UsersResults
					loading={loading}
					currentSearch={currentSearch}
					currentPageData={currentPageData}
				></UsersResults>
			</Row>
		</React.Fragment>
	);
};

export default Users;
