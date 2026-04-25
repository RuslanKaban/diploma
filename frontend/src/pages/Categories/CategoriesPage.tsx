import { useNavigate, useParams } from 'react-router-dom';
import Categories, { type Category } from '../../components/Categories/Categories';
import styles from './CategoriesPage.module.css';

import menTshirts from '../../assets/men/tshirts.png';
import menTankTops from '../../assets/men/tanktops.png';
import menjackets from '../../assets/men/jackets.png';
import menSweatshirts from '../../assets/men/sweatshirts.png';
import menJeans from '../../assets/men/jeans.png';
import menShorts from '../../assets/men/shorts.png';
import menPants from '../../assets/men/pants.png';
import menShoes from '../../assets/men/shoes.png';

import womenTshirts from '../../assets/women/tshirt.png';
import womenTops from '../../assets/women/tops.png';
import womenJackets from '../../assets/women/jackets.png';
import womenSweatshirts from '../../assets/women/sweatshirt.png';
import womenJeans from '../../assets/women/jeans.png';
import womenSkirts from '../../assets/women/skirts.png';
import womenPants from '../../assets/women/pants.png';
import womenShoes from '../../assets/women/shoes.png';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { gender } = useParams();

  const active = gender === 'women' ? 'women' : 'men';

  const menCategories: Category[] = [
    { title: 'Футболки', image: menTshirts, slug: 'men/tshirts' },
    { title: 'Майки', image: menTankTops, slug: 'men/tanktops' },
    { title: 'Куртки', image: menjackets, slug: 'men/jackets' },
    { title: 'Свитшоты', image: menSweatshirts, slug: 'men/sweatshirts' },
    { title: 'Джинсы', image: menJeans, slug: 'men/jeans' },
    { title: 'Шорты', image: menShorts, slug: 'men/shorts' },
    { title: 'Брюки', image: menPants, slug: 'men/pants' },
    { title: 'Обувь', image: menShoes, slug: 'men/shoes' },
  ];

  const womenCategories: Category[] = [
    { title: 'Футболки', image: womenTshirts, slug: 'women/tshirts' },
    { title: 'Топы', image: womenTops, slug: 'women/tops' },
    { title: 'Куртки', image: womenJackets, slug: 'women/jackets' },
    { title: 'Свитшоты', image: womenSweatshirts, slug: 'women/sweatshirts' },
    { title: 'Джинсы', image: womenJeans, slug: 'women/jeans' },
    { title: 'Юбки', image: womenSkirts, slug: 'women/skirts' },
    { title: 'Брюки', image: womenPants, slug: 'women/pants' },
    { title: 'Обувь', image: womenShoes, slug: 'women/shoes' },
  ];

  const categories = active === 'men' ? menCategories : womenCategories;

  return (
    <section className={styles.section}>
      <div className={styles.toggleWrapper}>
        <div className={styles.toggleButtons}>
          <button
            className={active === 'men' ? styles.active : ''}
            onClick={() => navigate('/categories/men')}
          >
            Мужчины
          </button>

          <span className={styles.separator}>\</span>

          <button
            className={active === 'women' ? styles.active : ''}
            onClick={() => navigate('/categories/women')}
          >
            Женщины
          </button>
        </div>
      </div>

      <Categories data={categories} />
    </section>
  );
};

export default CategoriesPage;