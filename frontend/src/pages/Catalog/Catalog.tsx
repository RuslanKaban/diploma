import { useEffect, useState } from 'react';

const Catalog = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Каталог</h1>

      {products.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.price} ₽</p>
        </div>
      ))}
    </div>
  );
};

export default Catalog;