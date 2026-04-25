import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import heroImg from '../../assets/heroImg.png';
import men from '../../assets/men.png';
import women from '../../assets/women.png';
import unisex from '../../assets/unisex.png';
import menOuterwear from '../../assets/menOuterwear.png'
import menTshirts from '../../assets/menTshirts.png';
import menJeans from '../../assets/menJeans.png';
import womenOuterwear from '../../assets/womenOuterwear.png';
import womenTshirts from '../../assets/womenTshirts.png';
import womenJeans from '../../assets/womenJeans.png';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <img src={heroImg} alt="Hero" />

        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Твой стиль — твои правила
          </h1>

          <p className={styles.hero__subtitle}>
            От базовых вещей до смелых образов — мы помогаем тебе создавать свой неповторимый стиль
          </p>

        </div>

        <button onClick={() => navigate('/categories')} className={styles.hero__button}>
          Перейти к покупкам 
        </button>
      </section>

      <section className={styles.fresh}>
        <h2 className={styles.fresh__title}>
          Свежие поступления и новые коллекции
        </h2>

        <ul className={styles.fresh__list}>
          <li className={styles.fresh__item}>
            <img src={men} alt="Мужчины" />
            <button className={styles.fresh__button}>
              Мужчины
            </button>
          </li>

          <li className={styles.fresh__item}>
            <img src={women} alt="Женщины" />
            <button className={styles.fresh__button}>
              Женщины
            </button>
          </li>

          <li className={styles.fresh__item}>
            <img src={unisex} alt="Унисекс" />
            <button className={styles.fresh__button}>
              Унисекс
            </button>
          </li>
        </ul>
      </section>

      <section className={styles.categories}>
        <h2 className={styles.categories__title}>КАТЕГОРИИ ДЛЯ МУЖЧИН</h2>
        <div className={styles.categories__block}>
          <div className={styles.categories__grid}>
            <a href="/men/outerwear" className={styles.categories__card}>
              <img src={menOuterwear} alt="Верхняя одежда" />
              <span className={styles.categories__label}>ВЕРХНЯЯ ОДЕЖДА</span>
            </a>
            <a href="/men/tshirts" className={styles.categories__card}>
              <img src={menTshirts} alt="Футболки" />
              <span className={styles.categories__label}>ФУТБОЛКИ</span>
            </a>
            <a href="/men/jeans" className={styles.categories__card}>
              <img src={menJeans} alt="Джинсы" />
              <span className={styles.categories__label}>ДЖИНСЫ</span>
            </a>
          </div>
          <button className={styles.categories__more}>БОЛЬШЕ &rarr;</button>
        </div>
        <h2 className={styles.categories__title}>КАТЕГОРИИ ДЛЯ ЖЕНЩИН</h2>
        <div className={styles.categories__block}>
          <div className={styles.categories__grid}>
            <a href="/women/outerwear" className={styles.categories__card}>
              <img src={womenOuterwear} alt="Верхняя одежда" />
              <span className={styles.categories__label}>ВЕРХНЯЯ ОДЕЖДА</span>
            </a>
            <a href="/women/tshirts" className={styles.categories__card}>
              <img src={womenTshirts} alt="Футболки" />
              <span className={styles.categories__label}>ФУТБОЛКИ</span>
            </a>
            <a href="/women/jeans" className={styles.categories__card}>
              <img src={womenJeans} alt="Джинсы" />
              <span className={styles.categories__label}>ДЖИНСЫ</span>
            </a>
          </div>
          <button className={styles.categories__more}>БОЛЬШЕ &rarr;</button>
        </div>
      </section>
    </div>
  );
}

export default Home 