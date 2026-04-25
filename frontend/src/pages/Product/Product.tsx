import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Product.module.css';
import { FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

type Category = {
  id: number;
  name: string;
  slug: string;
  gender: string;
};

type Size = {
  id: number;
  name: string;
};

type Color = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice: number | null;
  description: string;
  image: string;
  rating: number;
  Category?: Category;
  Sizes?: Size[];
  Colors?: Color[];
};

type Review = {
  id: number;
  author: string;
  rating: number;
  text: string;
};

const genderMap: Record<string, string> = {
  men: 'FOR MAN',
  women: 'FOR WOMAN',
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

const colorMap: Record<string, string> = {
  Black: '#1f1f1f',
  White: '#f5f5f5',
  Blue: '#2f4fa3',
  Gray: '#b9b9b9',
};

const getImageFilterClass = (color: string) => {
  switch (color) {
    case 'Black':
      return styles.imageBlack;
    case 'White':
      return styles.imageWhite;
    case 'Blue':
      return styles.imageBlue;
    case 'Gray':
      return styles.imageGray;
    default:
      return '';
  }
};

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: 'В. Петрова',
      rating: 5,
      text: 'Сидит свободно, ткань плотная. После стирки форма не ушла.',
    },
    {
      id: 2,
      author: 'DamskiyUgodnik217',
      rating: 4,
      text: 'Выглядит стильно, но материал чуть плотнее, чем ожидала.',
    },
  ]);

  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState('5');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewAuthor.trim() || !reviewText.trim()) {
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      author: reviewAuthor,
      rating: Number(reviewRating),
      text: reviewText,
    };

    setReviews([newReview, ...reviews]);

    setReviewAuthor('');
    setReviewText('');
    setReviewRating('5');
  };

  const averageRating =
    reviews.length > 0
      ? (
        reviews.reduce((sum, r) => sum + r.rating, 0) /
        reviews.length
      ).toFixed(1)
      : '0.0';

  const visibleReviews = showAllReviews
    ? reviews
    : reviews.slice(0, 4);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    });
  };

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);

        if (data?.Sizes?.length) {
          setSelectedSize(data.Sizes[0].name);
        }

        if (data?.Colors?.length) {
          setSelectedColor(data.Colors[0].name);
        }

        if (data?.Category?.gender && data?.Category?.slug) {
          fetch(`/api/products?gender=${data.Category.gender}&slug=${data.Category.slug}`)
            .then((res) => res.json())
            .then((products) => {
              const filtered = products
                .filter((item: Product) => item.id !== data.id)
                .slice(0, 4);

              setSimilarProducts(filtered);
            });
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!product) {
    return <div className={styles.loading}>Загрузка...</div>;
  }



  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link
            to={`/category/${product.Category?.gender}/${product.Category?.slug}`}
            className={styles.breadcrumbLink}
          >
            {categoryMap[product.Category?.slug ?? '']}
          </Link>
          <span className={styles.separator}>\</span>
          <span className={styles.current}>{product.title.toUpperCase()}</span>
        </div>

        <div className={styles.topBlock}>
          <div className={styles.imageBlock}>
            <img
              src={product.image}
              alt={product.title}
              className={`${styles.mainImage} ${getImageFilterClass(selectedColor)}`}
            />
          </div>

          <div className={styles.infoBlock}>
            <h1 className={styles.title}>{product.title.toUpperCase()}</h1>
            <p className={styles.gender}>
              {genderMap[product.Category?.gender ?? '']}
            </p>

            <div className={styles.colorsBlock}>
              {product.Colors?.length ? (
                product.Colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    className={`${styles.colorThumb} ${selectedColor === color.name ? styles.colorThumbActive : ''
                      }`}
                    onClick={() => setSelectedColor(color.name)}
                    style={{ backgroundColor: colorMap[color.name] || '#ddd' }}
                    title={color.name}
                  />
                ))
              ) : (
                <>
                  <button
                    type="button"
                    className={`${styles.colorThumb} ${styles.colorThumbActive}`}
                    style={{ backgroundColor: colorMap.Black }}
                  />
                  <button
                    type="button"
                    className={styles.colorThumb}
                    style={{ backgroundColor: colorMap.White }}
                  />
                  <button
                    type="button"
                    className={styles.colorThumb}
                    style={{ backgroundColor: colorMap.Blue }}
                  />
                  <button
                    type="button"
                    className={styles.colorThumb}
                    style={{ backgroundColor: colorMap.Gray }}
                  />
                </>
              )}
            </div>

            <p className={styles.selectedColorText}>{selectedColor}</p>

            <div className={styles.sizesBlock}>
              {product.Sizes?.length ? (
                product.Sizes.map((size) => (
                  <button
                    key={size.id}
                    className={`${styles.sizeButton} ${selectedSize === size.name ? styles.sizeButtonActive : ''
                      }`}
                    onClick={() => setSelectedSize(size.name)}
                  >
                    {size.name}
                  </button>
                ))
              ) : (
                <>
                  <button className={styles.sizeButton}>XS</button>
                  <button className={styles.sizeButton}>S</button>
                  <button className={styles.sizeButton}>M</button>
                  <button className={styles.sizeButton}>L</button>
                  <button className={`${styles.sizeButton} ${styles.sizeButtonActive}`}>XL</button>
                </>
              )}
            </div>

            <p className={styles.price}>{product.price}.00 руб.</p>

            <div className={styles.actions}>
              <button className={styles.cartButton} onClick={handleAddToCart}>
                В КОРЗИНУ
              </button>
              <button className={styles.iconButton}>
                <FaShoppingBag />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.descriptionBlock}>
          <h2 className={styles.sectionTitle}>О ТОВАРЕ</h2>
          <p className={styles.description}>
            {product.description}
          </p>
        </div>

        <div className={styles.reviewsBlock}>
          <div className={styles.reviewsTop}>
            <span className={styles.reviewsTitle}>ОТЗЫВЫ</span>
            <button className={styles.ratingButton}>
              {averageRating} ★ ({reviews.length})
            </button>
            <button className={styles.sortButton}>САМЫЕ НОВЫЕ</button>
          </div>

          <form className={styles.reviewForm} onSubmit={handleAddReview}>
            <input
              className={styles.reviewInput}
              type="text"
              placeholder="Ваше имя"
              value={reviewAuthor}
              onChange={(e) => setReviewAuthor(e.target.value)}
            />

            <select
              className={styles.reviewSelect}
              value={reviewRating}
              onChange={(e) => setReviewRating(e.target.value)}
            >
              <option value="5">5 ★</option>
              <option value="4">4 ★</option>
              <option value="3">3 ★</option>
              <option value="2">2 ★</option>
              <option value="1">1 ★</option>
            </select>

            <textarea
              className={styles.reviewTextarea}
              placeholder="Напишите отзыв"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <button className={styles.reviewSubmit} type="submit">
              ОТПРАВИТЬ
            </button>
          </form>

          <div className={styles.reviewsList}>
            {visibleReviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <p className={styles.reviewAuthor}>{review.author}</p>
                <p className={styles.reviewStars}>{'★'.repeat(review.rating)}</p>
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {reviews.length > 4 && (
          <button
            className={styles.moreReviews}
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'СВЕРНУТЬ' : 'ЕЩЁ'}
          </button>
        )}

        <div className={styles.similarBlock}>
          <h2 className={styles.sectionTitle}>ПОХОЖИЕ ТОВАРЫ</h2>

          <div className={styles.similarGrid}>
            {similarProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className={styles.similarCard}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.similarImage}
                />
                <h3 className={styles.similarTitle}>{item.title}</h3>
                <p className={styles.similarPrice}>{item.price}.00 ₽ / рублей</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;