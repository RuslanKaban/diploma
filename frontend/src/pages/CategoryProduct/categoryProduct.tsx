import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './categoryProduct.module.css';
import { FaHeart } from 'react-icons/fa';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  Sizes?: { id: number; name: string }[];
  Colors?: { id: number; name: string }[];
};

const genderMap: Record<string, string> = {
  men: 'МУЖЧИНЫ',
  women: 'ЖЕНЩИНЫ',
};

const categoryMap: Record<string, string> = {
  tshirts: 'ФУТБОЛКИ',
  tanktops: 'МАЙКИ',
  jackets: 'КУРТКИ',
  sweatshirts: 'СВИТШОТЫ',
  jeans: 'ДЖИНСЫ',
  shorts: 'ШОРТЫ',
  pants: 'БРЮКИ',
  shoes: 'ОБУВЬ',
  tops: 'ТОПЫ',
  skirts: 'ЮБКИ',
};

const CategoryProductsPage = () => {
  const { gender, slug } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  useEffect(() => {
    fetch(`/api/products?gender=${gender}&slug=${slug}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, [gender, slug]);

  const filteredProducts = products.filter((product) => {
    const matchesSize =
      !selectedSize ||
      product.Sizes?.some((size) => size.name === selectedSize);

    const matchesColor =
      !selectedColor ||
      product.Colors?.some((color) => color.name === selectedColor);

    const matchesPrice =
      !maxPrice || product.price <= Number(maxPrice);

    return matchesSize && matchesColor && matchesPrice;
  });

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link to={`/categories/${gender}`} className={styles.link}>
            {genderMap[gender ?? '']}
          </Link>

          <span className={styles.separator}>→</span>

          <span className={styles.current}>
            {categoryMap[slug ?? '']}
          </span>
        </div>

        <div className={styles.filters}>
          <select
            className={styles.filterButton}
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">РАЗМЕР</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <select
            className={styles.filterButton}
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">ЦВЕТ</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
            <option value="Gray">Gray</option>
          </select>

          <select
            className={styles.filterButton}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            <option value="">ЦЕНА</option>
            <option value="3000">до 3000</option>
            <option value="5000">до 5000</option>
            <option value="10000">до 10000</option>
            <option value="20000">до 20000</option>
          </select>

          <button
            className={styles.filterButton}
            onClick={() => {
              setSelectedSize('');
              setSelectedColor('');
              setMaxPrice('');
            }}
          >
            СБРОС
          </button>
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className={styles.cardLink}>
              <article className={styles.card}>
                <div className={styles.cardImageWrapper}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.cardImage}
                  />
                  <button className={styles.favoriteButton}>
                    <FaHeart className={styles.heartIcon} />
                  </button>
                </div>

                <h3 className={styles.cardTitle}>{product.title}</h3>
                <p className={styles.cardPrice}>{product.price}.00 ₽</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryProductsPage;