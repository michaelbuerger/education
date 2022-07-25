import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Select, Spin } from "antd";
import { useState, React } from "react";
import { addNewStudent } from "./client";
import {
	successNotification,
	errorNotification,
	backendResponseErrorNotification,
} from "./Notification";

const { Option } = Select;

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 24,
		}}
		spin
	/>
);

function StudentDrawerForm({ showDrawer, setShowDrawer, fetchStudents }) {
	const onClose = () => setShowDrawer(false);
	const [submitting, setSubmitting] = useState(false);

	const addStudent = (student) =>
		addNewStudent(student)
			.then(() => {
				successNotification(
					"Student successfully added!",
					`${student.name} was added to the system`
				);
				return Promise.resolve();
			})
			.catch((error) => {
				backendResponseErrorNotification(error);
				return Promise.reject();
			});

	const onFinish = (student) => {
		setSubmitting(true); // spin icon
		addStudent(student)
			.then(() => {
				// student added successfully
				onClose(); // close form
				fetchStudents(); // re-fetch students from backend
			})
			.finally(() => {
				// regardless
				setSubmitting(false); // spin icon
			});
	};

	const onFinishFailed = (errorInfo) => {
		// reached if empty values
		//alert(JSON.stringify(errorInfo, null, 2));
	};

	return (
		<Drawer
			title="Add New Student"
			width={720}
			onClose={onClose}
			visible={showDrawer}
			bodyStyle={{ paddingBottom: 80 }}
			footer={
				<div
					style={{
						textAlign: "right",
					}}
				>
					<Button onClick={onClose} style={{ marginRight: 8 }}>
						Cancel
					</Button>
				</div>
			}
		>
			<Form
				layout="vertical"
				onFinishFailed={onFinishFailed}
				onFinish={onFinish}
				hideRequiredMark
			>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name="name"
							label="Name"
							rules={[
								{
									required: true,
									message: "Please enter student name",
								},
							]}
						>
							<Input placeholder="Please enter student name" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="email"
							label="Email"
							rules={[
								{
									required: true,
									message: "Please enter student email",
								},
							]}
						>
							<Input placeholder="Please enter student email" />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name="gender"
							label="Gender"
							rules={[
								{
									required: true,
									message: "Please select a gender",
								},
							]}
						>
							<Select placeholder="Please select a gender">
								<Option value="MALE">MALE</Option>
								<Option value="FEMALE">FEMALE</Option>
								<Option value="OTHER">OTHER</Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					{
						submitting && (
							<Spin indicator={antIcon} visible={submitting} />
						) /* this is weird but basically if submitting is true {} evaluates to right hand of && */
					}
				</Row>
			</Form>
		</Drawer>
	);
}

export default StudentDrawerForm;
