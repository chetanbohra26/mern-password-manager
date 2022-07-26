const { CourierClient } = require("@trycourier/courier");

let courier;

const mailerInit = () => {
	try {
		courier = CourierClient({
			authorizationToken: process.env.COURIER_TOKEN,
		});
	} catch (err) {
		console.log("[ERROR] Error while initializing courier", err.message);
	}
};

const sendMail = (email, title, body) => {
	try {
		return courier.send({
			message: {
				to: {
					email,
				},
				content: {
					title,
					body,
				},
			},
		});
	} catch (err) {
		console.log("[ERROR] Error while sending mail:", err.message);
	}
};

module.exports.mailerInit = mailerInit;
module.exports.sendMail = sendMail;
