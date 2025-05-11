'use client';
import React, { useRef, useState } from 'react';
import styles from './Music.module.scss';
import Image from 'next/image';

export const Music = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);
	const togglePlay = () => {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<>
			<button className={styles.btn} onClick={togglePlay}>
				<Image
					className={styles.btn_img}
					src={isPlaying ? '/images/sound.webp' : '/images/mute.webp'}
					width={30}
					height={30}
					alt="sound"
				/>
				<span>вкл. музыку</span>
			</button>
			<audio ref={audioRef} src="/sound/music.mp3" preload="auto" />
		</>
	);
};
