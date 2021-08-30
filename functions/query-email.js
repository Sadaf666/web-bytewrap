// external libraries
const dotenv = require('dotenv');
dotenv.config({});

const nodemailer = require('nodemailer');

exports.handler = async (event) => {
	// const { email } = JSON.parse(event.body);
	const email = 'sadafbytewrap1995@gmail.com';

	const { MAIL_PORT, MAIL_STATE, MAIL_ID, MAIL_PASS, MAIL_TO } = process.env;

	console.log({ MAIL_PORT, MAIL_STATE, MAIL_ID, MAIL_PASS, MAIL_TO });

	const transporter = await nodemailer.createTransport({
		// true for 465, false for other ports
		host: 'smtp.gmail.com',
		port: MAIL_PORT,
		secure: MAIL_STATE === 'true' ? true : false,
		auth: {
			user: MAIL_ID, // generated ethereal user
			pass: MAIL_PASS, // generated ethereal password
		},
	});

	const mail = await transporter.sendMail({
		from: `"Bytewrap" <${MAIL_ID}>`,
		to: email,
		subject: 'BW project email.',
		// html: content,
	});

	console.log({
		messageId: mail.messageId,
		accepted: mail.accepted,
		rejected: mail.rejected,
		response: mail.response,
	});

	return {
		statusCode: 200,
		body: 'Email has been sent successfully.',
	};
};
