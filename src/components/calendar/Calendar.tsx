import React, { useRef, useState } from 'react';
import styles from './Calendar.module.scss';

export const Calendar = () => {
	const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
	const daysInSeptember = 30;

	const emptySlots = 6;

	const calendarDays = [
		...Array(emptySlots).fill(null),
		...Array.from({ length: daysInSeptember }, (_, i) => i + 1),
	];

	return (
		<div className={styles.calendar} aria-label="Календарь сентября">
			<div className={styles.weekdays} role="row">
				{weekdays.map((day) => (
					<div key={day} role="columnheader" className={styles.weekday}>
						{day}
					</div>
				))}
			</div>
			<div className={styles.days} role="rowgroup" aria-label="Даты месяца сентября">
				{calendarDays.map((day, index) =>
					day ? (
						day === 27 ? (
							<div
								key={index}
								className={styles.dayWrapper}
								aria-current="date"
								aria-label="27 сентября">
								<img
									src="/images/ring.webp"
									alt=""
									aria-hidden="true"
									className={styles.ring}
								/>
								<div className={styles.day}>{day}</div>
							</div>
						) : (
							<div key={index} className={styles.day}>
								{day}
							</div>
						)
					) : (
						<div key={index} className={styles.empty} aria-hidden="true" />
					)
				)}
			</div>
		</div>
	);
};
