import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Empty } from "antd";
import SearchBar from "../../Components/UI/Search Bar/Search Bar";
import Requests from "../../Components/Requests/Requests";
import UsersResults from "../../Components/Users/Search Results";
import Pagination from "../../Components/UI/Pagination/Pagination";

const PAGE_SIZE = 20;

const Users = (props) => {
	const [loading, setLoading] = useState(false);
	const [currentSearch, setCurrentSearch] = useState("");
	const [allData, setAllData] = useState([]);
	const [currentPageData, setCurrentPageData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalUsersInSearch, setTotalUsersInSearch] = useState(1);

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
					const totalNumOfUsers = res.results.length;
					setTotalUsersInSearch(totalNumOfUsers);
					if (res.results.length > 0) {
						let currentPageData;
						if (res.results.length > PAGE_SIZE) {
							const initialIndex =
								currentPage === 1 ? 0 : (currentPage - 1) * PAGE_SIZE;
							currentPageData = res.results.slice(
								initialIndex,
								initialIndex + PAGE_SIZE
							);
							setCurrentPageData(currentPageData);
						} else {
							currentPageData = res.results;
							setCurrentPageData(currentPageData);
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
	}

	const onChangePagination = (selectedPage) => {
		setCurrentPage(selectedPage);
		setLoading(true);
		let currentPageData;
		if (allData.length > PAGE_SIZE) {
			const initialIndex =
				selectedPage === 1 ? 0 : (selectedPage - 1) * PAGE_SIZE;
			currentPageData = allData.slice(initialIndex, initialIndex + PAGE_SIZE);
			setCurrentPageData(currentPageData);
		} else {
			currentPageData = allData;
			setCurrentPageData(currentPageData);
		}
		setLoading(false);
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
			<Row justify="center" align="middle">
				<Col span={20}>
					<Pagination
						current={currentPage}
						onChange={onChangePagination}
						defaultPageSize={PAGE_SIZE}
						total={totalUsersInSearch}
					></Pagination>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default Users;
