import Image from 'next/image';
import styles from './page.module.scss';
import { Music } from '@/components/music/Music';
import { Calendar } from '@/components/calendar/Calendar';
import { Map } from '@/components/map/Map';
import { Timer } from '@/components/timer/Timer';
import { Form } from '@/components/form/Form';

export default function Home() {
	return (
		<main className={styles.page}>
			<Image
				className={styles.background}
				src={'/images/background.JPG'}
				height={800}
				width={400}
				alt="фон"
				quality={100}
			/>
			<section className={`${styles.section} ${styles.block1}`}>
				<h1 className={`${styles.title} ${styles.block1_title}`}>
					<span>Максим</span> <span>Виктория</span>
					<div className={styles.block1_img}>
						<Image src="/images/and.webp" alt="and" height={300} width={300} />
					</div>
				</h1>
				<div className={styles.block1_arrow}>
					<Image src="/images/arrow-down.webp" alt="and" height={84} width={84} />
				</div>
			</section>
			<div className={styles.info}>
				<section className={`${styles.section} ${styles.block2}`}>
					<h2 className={styles.subtitle}>Дорогие гости</h2>
					<Music />
					<p className={styles.text}>
						В нашей жизни произойдет очень
						<br />
						важное событие – наша свадьба!
						<br />
						<br />
						Позвольте пригласить Вас разделить с нами радость этого дня. Подарите свою
						поддержку и добрые пожелания, а мы в свою очередь поделимся частичкой нашего
						счастья.
					</p>
				</section>
				<section className={`${styles.section} ${styles.block3}`}>
					<h2 className={styles.subtitle}>Сентябрь</h2>
					<Calendar />
				</section>
				<section className={`${styles.section} ${styles.block7}`}>
					<h2 className={`${styles.subtitle} ${styles.block7_title}`}>
						Ждем вас <br /> <span>через...</span>
					</h2>
					<Timer />
				</section>
				<section className={`${styles.section} ${styles.block4}`}>
					<h2 className={styles.subtitle}>План дня</h2>
					<div className={styles.block4_block}>
						<div className={styles.block4_line}></div>
						<ul className={styles.block4_list}>
							<li>
								<span>16:00</span>
								<span>Сбор гостей</span>
							</li>
							<li>
								<span>17:00</span>
								<span>
									Регистрация
								</span>
							</li>
							<li>
								<span>18:00</span>
								<span>Банкет</span>
							</li>
							<li>
								<span>00:00</span>
								<span>Завершение</span>
							</li>
						</ul>
					</div>
				</section>
				<section className={`${styles.section} ${styles.block5}`}>
					<h2 className={styles.subtitle}>Место проведения</h2>
					<p className={styles.text}>
						Банкетный зал «Жардин» <br />
						Левобережная ул., 50, Ростов-на-Дону
					</p>
				</section>
				<Map />
				<section className={`${styles.section} ${styles.block6}`}>
					<h2 className={styles.subtitle}>Детали</h2>
					<p className={styles.text}>
						Дорогие гости, знаем, что на свадьбах принято дарить цветы, но мы просим вас
						их не дарить, мы не успеем насладиться этой красотой! Но, по желанию,
						выразить вашу любовь и радость можно в виде бутылки вина или шампанского,
						которое, мы откроем на ближайшем совместном празднике.
					</p>
				</section>
				<section className={`${styles.section} ${styles.block7}`}>
					<h2 className={styles.subtitle}>Анкета</h2>
					<p className={styles.text}>
						Ответьте, пожалуйста, на несколько вопросов, которые мы для Вас подготовили
					</p>
					<Form />
				</section>
				<section className={`${styles.section} ${styles.block8}`}>
					<h2 className={styles.subtitle}>Организация свадьбы</h2>
					<p className={styles.text}>
						В случае возникновения вопросов по торжеству, обращайтесь к нашему
						свадебному организатору <br /> Виктории Панюковой
					</p>
					<a className={styles.block8_phone} href="tel:+79094138772">
						+7 (909) 413-8772
					</a>
					<a
						className={styles.block8_whatsapp}
						target="_blank"
						href="https://wa.me/79094138772">
						WhatsApp
					</a>
				</section>
			</div>
		</main>
	);
}
