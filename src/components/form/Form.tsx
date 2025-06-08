'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Form.module.scss';

type FormValues = {
	fullName: string;
	phone: string;
	attendance: string;
	drinks: string[];
};

const attendanceOptions = ['Я приду', 'К сожалению, не смогу присутствовать', 'Сообщу позже'];

const drinksOptions = [
	'Красное вино',
	'Белое вино',
	'Шампанское',
	'Водка',
	'Виски',
	'Коньяк',
	'Не пью алкоголь',
];

export const Form = () => {
	const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(
		null
	);

	const validationSchema = Yup.object({
		fullName: Yup.string()
			.required('Пожалуйста, укажите ваши ФИО')
			.min(2, 'Слишком короткое имя'),
		phone: Yup.string()
			.required('Пожалуйста, укажите ваш телефон'),
		attendance: Yup.string().required('Пожалуйста, выберите вариант посещения'),
		drinks: Yup.array().min(1, 'Пожалуйста, выберите хотя бы один напиток'),
	});

	const formik = useFormik<FormValues>({
		initialValues: {
			fullName: '',
			phone: '',
			attendance: '',
			drinks: [],
		},
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				setSubmitStatus(null);
				const res = await fetch('/api/sendEmail', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(values),
				});
				if (res.ok) {
					setSubmitStatus({
						success: true,
						message: 'Спасибо! Данные успешно отправлены.',
					});
					resetForm();
				} else {
					const data = await res.json();
					setSubmitStatus({
						success: false,
						message: data.error || 'Ошибка при отправке формы',
					});
				}
			} catch (error) {
				setSubmitStatus({ success: false, message: 'Ошибка при отправке формы' });
			}
		},
	});

	const handleDrinksCheckboxChange = (value: string) => {
		const currentArray = formik.values.drinks;
		if (currentArray.includes(value)) {
			// remove
			formik.setFieldValue(
				'drinks',
				currentArray.filter((item) => item !== value)
			);
		} else {
			// add
			formik.setFieldValue('drinks', [...currentArray, value]);
		}
	};

	return (
		<div className={styles.container}>
			<form onSubmit={formik.handleSubmit} noValidate>
				<div className={styles.formGroup}>
					<label htmlFor="fullName" className={styles.label}>
						Напишите, пожалуйста, Ваши ФИО
					</label>
					<input
						id="fullName"
						name="fullName"
						type="text"
						className={styles.input}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.fullName}
						placeholder="Ваши ФИО"
					/>
					{formik.touched.fullName && formik.errors.fullName ? (
						<div className={styles.error}>{formik.errors.fullName}</div>
					) : null}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="phone" className={styles.label}>
						Ваш телефон
					</label>
					<input
						id="phone"
						name="phone"
						type="text"
						className={styles.input}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.phone}
						placeholder="Ваш телефон"
					/>
					{formik.touched.phone && formik.errors.phone ? (
						<div className={styles.error}>{formik.errors.phone}</div>
					) : null}
				</div>

				{/* Attendance radios */}
				<div className={styles.formGroup}>
					<label className={styles.label}>
						Сможете ли присутствовать на нашем торжестве?
					</label>
					<ul
						className={styles.checkboxList}
						role="radiogroup"
						aria-labelledby="attendance-label">
						{attendanceOptions.map((option) => (
							<li key={option} className={styles.checkboxItem}>
								<input
									type="radio"
									id={`attendance-${option}`}
									name="attendance"
									value={option}
									checked={formik.values.attendance === option}
									onChange={() => formik.setFieldValue('attendance', option)}
								/>
								<label htmlFor={`attendance-${option}`}>{option}</label>
							</li>
						))}
					</ul>
					{formik.touched.attendance && formik.errors.attendance ? (
						<div className={styles.error}>{formik.errors.attendance}</div>
					) : null}
				</div>

				{/* Drinks checkboxes */}
				<div className={styles.formGroup}>
					<label className={styles.label}>Что предпочитаете из напитков?</label>
					<ul className={styles.checkboxList}>
						{drinksOptions.map((option) => (
							<li key={option} className={styles.checkboxItem}>
								<input
									type="checkbox"
									id={`drinks-${option}`}
									name="drinks"
									value={option}
									checked={formik.values.drinks.includes(option)}
									onChange={() => handleDrinksCheckboxChange(option)}
								/>
								<label htmlFor={`drinks-${option}`}>{option}</label>
							</li>
						))}
					</ul>
					{formik.touched.drinks && formik.errors.drinks ? (
						<div className={styles.error}>{formik.errors.drinks}</div>
					) : null}
				</div>

				<button type="submit" className={styles.button} disabled={formik.isSubmitting}>
					{formik.isSubmitting ? 'Отправка...' : 'Отправить'}
				</button>
			</form>

			{submitStatus && (
				<div
					className={`${styles.feedback} ${
						submitStatus.success ? styles.success : styles.errorFeedback
					}`}
					role="alert">
					{submitStatus.message}
				</div>
			)}
		</div>
	);
};
