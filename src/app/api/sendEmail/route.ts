import nodemailer from 'nodemailer';

type FormValues = {
	fullName: string;
	attendance: string;
	drinks: string[];
};

export async function POST(request: Request) {
	try {
		const data: FormValues = await request.json();

		const { fullName, attendance, drinks } = data;

		// Basic validation
		if (
			typeof fullName !== 'string' ||
			fullName.trim().length < 2 ||
			typeof attendance !== 'string' ||
			attendance.trim() === '' ||
			!Array.isArray(drinks) ||
			drinks.length === 0
		) {
			return new Response(JSON.stringify({ error: 'Некорректные данные формы' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_PORT) || 587,
			secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: `"Анкета Торжества" <${process.env.EMAIL_USERNAME}>`,
			to: process.env.RECIPIENT_EMAIL || 'recipient@example.com',
			subject: 'Новая заявка с анкеты торжества',
			text: `
Новая заявка:

ФИО: ${fullName}
Посещение: ${attendance}
Напитки: ${drinks.join(', ')}

Спасибо!
      `,
		};

		await transporter.sendMail(mailOptions);

		return new Response(JSON.stringify({ message: 'Письмо успешно отправлено' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Ошибка при отправке почты:', error);
		return new Response(JSON.stringify({ error: 'Ошибка при отправке письма' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
