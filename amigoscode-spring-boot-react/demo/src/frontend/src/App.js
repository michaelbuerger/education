import { useEffect, useState } from "react";
import { deleteStudent, getAllStudents } from "./client";

import {
	DesktopOutlined,
	FileOutlined,
	LoadingOutlined,
	PieChartOutlined,
	PlusOutlined,
	TeamOutlined,
	UserOutlined,
	VerticalAlignMiddleOutlined,
} from "@ant-design/icons";
import {
	Badge,
	Breadcrumb,
	Button,
	Empty,
	Layout,
	Menu,
	Space,
	Spin,
	Table,
	Tag,
	Avatar,
	Radio,
	Popconfirm,
} from "antd";

import StudentDrawerForm from "./StudentDrawerForm";
import {
	successNotification,
	errorNotification,
	backendResponseErrorNotification,
} from "./Notification";

import "./App.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const items = [
	getItem("Option 1", "1", <PieChartOutlined />),
	getItem("Option 2", "2", <DesktopOutlined />),
	getItem("User", "sub1", <UserOutlined />, [
		getItem("Tom", "3"),
		getItem("Bill", "4"),
		getItem("Alex", "5"),
	]),
	getItem("Team", "sub2", <TeamOutlined />, [
		getItem("Team 1", "6"),
		getItem("Team 2", "8"),
	]),
	getItem("Files", "9", <FileOutlined />),
];

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 24,
		}}
		spin
	/>
);

function App() {
	const [students, setStudents] = useState([]); // declares state variable 'students' with setter function declared by setStudents
	const [collapsed, setCollapsed] = useState(false);
	const [fetching, setFetching] = useState(true);
	const [showDrawer, setShowDrawer] = useState(false);

	const StudentAvatar = ({ name }) => {
		const fmtName = name.trim().toUpperCase();
		if (fmtName.length === 0) {
			return <Avatar icon={<UserOutlined />}></Avatar>;
		}

		const split = fmtName.split(" ");
		if (split.length === 1) {
			return <Avatar>{split[0][0]}</Avatar>;
		}
		// now we know name contains at least first and second 'word'
		return <Avatar>{`${split[0][0]}${split[1][0]}`}</Avatar>;
	};

	const removeStudent = (student) =>
		deleteStudent(student.id)
			.then(() => {
				successNotification(
					`Student successfully deleted!`,
					`${student.name} was removed from the system`
				);
				return Promise.resolve();
			})
			.catch((error) => {
				backendResponseErrorNotification(error);
				return Promise.reject();
			});

	const columns = [
		{
			title: "",
			dataIndex: "avatar",
			key: "avatar",
			render: (text, student) => (
				<StudentAvatar name={student.name}></StudentAvatar>
			),
		},
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Gender", // title you see
			dataIndex: "gender", // maps to actual data source
			key: "gender", // key
		},
		{
			title: "Actions",
			key: "actions",
			render: (text, student) => (
				<>
					<Radio.Group>
						<Popconfirm
							title="Are you sure you want to delete this student?"
							onConfirm={
								() =>
									removeStudent(student).finally(
										fetchStudents
									) // fetch students regardless of error status, make display up to date may resolve non-existent delete e.g.
							}
							onCancel={() => {}}
							okText="Delete!"
							cancelText="Cancel"
						>
							<Radio.Button value="delete">Delete</Radio.Button>
						</Popconfirm>

						<Radio.Button value="edit">Edit</Radio.Button>
					</Radio.Group>
				</>
			),
		},
	];

	const fetchStudents = () =>
		// fetch students function that recieves students via unfetch call, processes response, and calls setStudents setter
		getAllStudents()
			.then((response) => response.json())
			.then((responseJSON) => {
				setStudents(responseJSON);
			})
			.catch((error) => {
				backendResponseErrorNotification(error);
			})
			.finally(() => setFetching(false));

	useEffect(() => {
		// calls fetchStudents method once on component mount (App mount)
		console.log("component is mounted");
		fetchStudents();
	}, []); // [] == don't call relative to dependency change

	const studentsHeader = () => {
		return (
			<>
				{students.length > 0 && (
					<>
						{" "}
						<Tag>number of students</Tag>
						<Badge
							className="site-badge-count-4"
							count={students.length}
						/>
						<br />
						<br />
					</>
				)}

				<Button
					onClick={() => setShowDrawer(!showDrawer)}
					type="primary"
					shape="round"
					icon={<PlusOutlined />}
					size="small"
				>
					Add New Student
				</Button>
			</>
		);
	};

	const renderStudents = () => {
		// render loading icon if fetching
		if (fetching) return <Spin indicator={antIcon} />;
		return (
			<>
				<StudentDrawerForm
					showDrawer={showDrawer}
					setShowDrawer={setShowDrawer}
					fetchStudents={fetchStudents}
				/>
				<Table
					dataSource={students}
					columns={columns}
					bordered
					title={() => studentsHeader(true)}
					pagination={{ pageSize: 50 }}
					scroll={{ y: 500 }}
					rowKey={(student) => student.id}
				/>
			</>
		);
	};

	return (
		<Layout
			style={{
				minHeight: "100vh",
			}}
		>
			<Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
				<div className="logo" />
				<Menu
					theme="dark"
					defaultSelectedKeys={["1"]}
					mode="inline"
					items={items}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header
					className="site-layout-background"
					style={{
						padding: 0,
					}}
				/>
				<Content
					style={{
						margin: "0 16px",
					}}
				>
					<Breadcrumb
						style={{
							margin: "16px 0",
						}}
					>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
					<div
						className="site-layout-background"
						style={{
							padding: 24,
							minHeight: 360,
						}}
					>
						{renderStudents()}
					</div>
				</Content>
				<Footer
					style={{
						textAlign: "center",
					}}
				>
					By Michael Buerger
				</Footer>
			</Layout>
		</Layout>
	);
}

export default App;
