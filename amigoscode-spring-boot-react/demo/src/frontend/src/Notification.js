import { notification } from "antd";

const openNotificationWithIcon = (
	type,
	message,
	description,
	duration,
	placement = "topRight"
) => {
	notification[type]({
		message, // message: message
		description, // description: description
		duration,
		placement,
	});
};

export const successNotification = (message, description, placement) =>
	openNotificationWithIcon("success", message, description, 2.5, placement);

export const errorNotification = (message, description, placement) =>
	openNotificationWithIcon("error", message, description, 0, placement);

export const infoNotification = (message, description, placement) =>
	openNotificationWithIcon("info", message, description, 2.5, placement);

export const warningNotification = (message, description, placement) =>
	openNotificationWithIcon("warning", message, description, 0, placement);

export const backendResponseErrorNotification = (error) =>
	error.response.json().then((res) => {
		errorNotification(
			`There was an issue!`,
			`'${res.message}' [${res.status} ${res.error}]`,
			"bottomLeft"
		);
	});
