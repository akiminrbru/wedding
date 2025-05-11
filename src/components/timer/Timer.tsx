'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Timer.module.scss';

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	daysDigitsCount: number;
}

function padLeft(value: number, length: number): string {
	return value.toString().padStart(length, '0');
}

function getDaysDigitsCount(days: number): number {
	if (days > 99) return 3;
	if (days > 9) return 2;
	return 2;
}

const circumference = 2 * Math.PI * 42; // same radius as CSS circle

export const Timer: React.FC = () => {
	// Correct useRef initialization with current property
	const targetDateRef = useRef<Date>(null);
	if (!targetDateRef.current) {
		const now = new Date();
		const year = now.getFullYear();
		let target = new Date(year, 8, 27, 16, 0, 0);
		if (target <= now) target = new Date(year + 1, 8, 27, 16, 0, 0);
		targetDateRef.current = target;
	}

	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		daysDigitsCount: 2,
	});

	useEffect(() => {
		function updateTimer(): void {
			const now = new Date();
			let diffMillis =
				(targetDateRef.current ? targetDateRef.current.getTime() : 0) - now.getTime();
			if (diffMillis < 0) diffMillis = 0;

			const diffSeconds = Math.floor(diffMillis / 1000);

			const days = Math.floor(diffSeconds / 86400);
			const hours = Math.floor((diffSeconds % 86400) / 3600);
			const minutes = Math.floor((diffSeconds % 3600) / 60);
			const seconds = diffSeconds % 60;

			const daysDigitsCount = getDaysDigitsCount(days);

			setTimeLeft({ days, hours, minutes, seconds, daysDigitsCount });
		}

		updateTimer();
		const intervalId = window.setInterval(updateTimer, 1000);
		return () => clearInterval(intervalId);
	}, []);

	const maxDaysValue: number = Math.pow(10, timeLeft.daysDigitsCount) - 1;
	const daysFraction: number = timeLeft.days / maxDaysValue;
	const hoursFraction: number = timeLeft.hours / 24;
	const minutesFraction: number = timeLeft.minutes / 60;
	const secondsFraction: number = timeLeft.seconds / 60;

	const strokeDashoffset = (fraction: number): number => circumference * (1 - fraction);

	return (
		<div
			className={styles.timerContainer}
			role="timer"
			aria-label="Таймер обратного отсчёта до 27 сентября 16:00">
			{[
				{
					id: 'days',
					label: 'Дней',
					value: padLeft(timeLeft.days, timeLeft.daysDigitsCount),
					fraction: daysFraction,
				},
				{
					id: 'hours',
					label: 'Часов',
					value: padLeft(timeLeft.hours, 2),
					fraction: hoursFraction,
				},
				{
					id: 'minutes',
					label: 'Минут',
					value: padLeft(timeLeft.minutes, 2),
					fraction: minutesFraction,
				},
				{
					id: 'seconds',
					label: 'Секунд',
					value: padLeft(timeLeft.seconds, 2),
					fraction: secondsFraction,
				},
			].map(({ id, label, value, fraction }) => (
				<div key={id} className={styles.timeSegment} aria-live="polite" aria-atomic="true">
					<div className={styles.circleBorder}>
						<div className={styles.digits}>{value}</div>
						<svg
							className={styles.progressRing}
							width="88"
							height="88"
							viewBox="0 0 88 88"
							aria-hidden="true"
							focusable="false">
							<circle
								className={styles.progressRingCircle}
								stroke="#55aaff"
								strokeWidth={4}
								fill="transparent"
								r={42}
								cx={44}
								cy={44}
								style={{
									strokeDasharray: circumference,
									strokeDashoffset: strokeDashoffset(fraction),
								}}
							/>
						</svg>
					</div>
					<div className={styles.label}>{label}</div>
				</div>
			))}
		</div>
	);
};
