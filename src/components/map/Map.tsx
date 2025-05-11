'use client';
import React, { useRef, useState } from 'react';
import styles from './Map.module.scss';
import Image from 'next/image';

export const Map = () => {
	const [isMapOpen, setIsMapOpen] = useState(false);

	return (
		<section className={styles.block}>
			<button className={styles.btn} onClick={() => setIsMapOpen((prev) => !prev)}>
				Карта{' '}
				<div className={styles.btn_image}>
					<Image src={'/images/arrow-right.webp'} width={50} height={50} alt="стрелка" />
				</div>
			</button>
			<div className={`${styles.map} ${isMapOpen && styles.map_active}`}>
				<iframe
					src="https://yandex.ru/map-widget/v1/?um=constructor%3A345068402ebc8a550de8e43da5835ee9be771065c9f3b443afd4b867639a20c2&amp;source=constructor"
					width="100%"
					height="400"></iframe>
			</div>
		</section>
	);
};
