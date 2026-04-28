import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchPage.module.css';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetch(`/api/products/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <section className={styles.search}>
      <div className={styles.container}>
        <h1>ПОИСК: {query}</h1>

        {loading && <p>Загрузка...</p>}

        {!loading && products.length === 0 && (
          <p>Ничего не найдено</p>
        )}

        <div className={styles.grid}>
          {products.map((item) => (
            <div key={item.id} className={styles.card}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.price} ₽</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;