import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Button } from "antd";
import SearchBar from "../../Components/UI/Search Bar/Search Bar";
import Requests from "../../Components/Requests/Requests";
import SearchResults from "../../Components/UI/Search Results/Search Results";
import Pagination from "../../Components/UI/Pagination/Pagination";
import { CloudDownloadOutlined } from "@ant-design/icons";

const PAGE_SIZE = 20;

const Users = (props) => {
	const [loading, setLoading] = useState(false);
	const [loadingMoreUsers, setLoadingMoreUsers] = useState(false);
	const [currentSearch, setCurrentSearch] = useState("");
	const [allData, setAllData] = useState([]);
	const [currentPageData, setCurrentPageData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [totalUsersInSearch, setTotalUsersInSearch] = useState(1);
	const [totalCoincidences, setTotalCoincidences] = useState(0);

	function searchUsers(search) {
		console.log("Searching: " + search);
		setCurrentSearch(search);
		if (search === "") {
			setAllData([]);
			setCurrentPageData([]);
			setTotalUsersInSearch(1);
			setCurrentPage(1);
			setLastPage(1);
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
					setTotalCoincidences(res.total);
					setCurrentPage(1);
					setTotalUsersInSearch(res.results.length);
					const lastPage = Math.ceil(res.results.length / PAGE_SIZE);
					setLastPage(lastPage);
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
		if (selectedPage === lastPage) {
			setLastPage(selectedPage);
		}
		setLoading(false);
	};

	const loadMoreUsers = () => {
		setLoadingMoreUsers(true);
		const searchConfigs = {
			searchType: "users",
			search: currentSearch,
			offset: currentPage * PAGE_SIZE,
		};
		Requests.searchMultiple(searchConfigs)
			.then((res) => {
				console.log(res);
				const newAllData = allData.concat(res.results);
				console.log("Data:", newAllData);
				setAllData(newAllData);
				setTotalCoincidences(res.total);
				setTotalUsersInSearch(newAllData.length);
				const lastPage = Math.ceil(newAllData.length / PAGE_SIZE);
				setLastPage(lastPage);
				if (res.results.length > 0) {
					let currentPageData;
					if (res.results.length > PAGE_SIZE) {
						currentPageData = res.results.slice(0, PAGE_SIZE);
						setCurrentPageData(currentPageData);
					} else {
						currentPageData = res.results;
						setCurrentPageData(currentPageData);
					}
				} else {
					setCurrentPageData([]);
				}
				setCurrentPage(currentPage + 1);
				setLoadingMoreUsers(false);
			})
			.catch((err) => {
				console.log(err);
				setLoadingMoreUsers(false);
			});
	};

	const searchBarConfigs = {
		loading: loading,
		placeholder: "Search for someone!",
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
				<SearchResults
					searchingFor={"users"}
					loading={loading}
					currentSearch={currentSearch}
					currentPageData={currentPageData}
					descriptionWhenEmpty={"Search for an user"}
					noResultTilte={"No users found"}
					noResultSubtitle={"Sorry, there are no users matching your search."}
				></SearchResults>
			</Row>
			{!loading && currentPage === lastPage &&
			lastPage !== 1 &&
			totalCoincidences !== totalUsersInSearch ? (
				<Row justify="center" align="middle" className="align-center-h">
					<Col span={20}>
						<Button
							type="primary"
							icon={<CloudDownloadOutlined />}
							size={"large"}
							loading={loadingMoreUsers}
							style={{ marginTop: "10px" }}
							onClick={loadMoreUsers}
						>
							Load More
						</Button>
					</Col>
				</Row>
			) : (
				""
			)}
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
