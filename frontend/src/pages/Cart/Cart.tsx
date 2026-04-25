import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    totalPrice,
    totalCount,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className={styles.cart}>
        <h1 className={styles.title}>КОРЗИНА</h1>

        <div className={styles.empty}>
          <p>Корзина пуста</p>

          <button
            className={styles.catalogButton}
            onClick={() => navigate('/categories')}
          >
            В КАТАЛОГ
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <h1 className={styles.title}>КОРЗИНА</h1>

      <div className={styles.cartContent}>
        <div className={styles.items}>
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className={styles.item}
            >
              <img src={item.image} alt={item.title} className={styles.image} />

              <div className={styles.info}>
                <h3>{item.title}</h3>

                <p>Размер: {item.size || 'не выбран'}</p>
                <p>Цвет: {item.color || 'не выбран'}</p>
                <p>Цена: {item.price} ₽</p>
                <p>Сумма: {item.price * item.quantity} ₽</p>

                <div className={styles.quantity}>
                  <button
                    onClick={() =>
                      decreaseQuantity(item.id, item.size, item.color)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id, item.size, item.color)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className={styles.remove}
                  onClick={() =>
                    removeFromCart(item.id, item.size, item.color)
                  }
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h2>ИТОГО</h2>

          <p>Товаров: {totalCount}</p>
          <p>Сумма: {totalPrice} ₽</p>

          <button
            className={styles.checkout}
            onClick={() => navigate('/checkout')}
          >
            ОФОРМИТЬ ЗАКАЗ
          </button>

          <button onClick={clearCart} className={styles.clear}>
            ОЧИСТИТЬ
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;