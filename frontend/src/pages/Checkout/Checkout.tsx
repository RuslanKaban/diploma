import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, totalPrice, totalCount, clearCart } = useCart();

  const [delivery, setDelivery] = useState('courier');
  const [payment, setPayment] = useState('card');
  const [address, setAddress] = useState({
    city: '',
    street: '',
    house: '',
    apartment: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
  });



  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.lastName.trim()) newErrors.lastName = true;
    if (!form.firstName.trim()) newErrors.firstName = true;
    if (!form.phone.trim() || form.phone.length < 18) newErrors.phone = true;
    if (!emailRegex.test(form.email)) newErrors.email = true;
    if (delivery === 'courier') {
      if (!address.city.trim()) newErrors.city = true;
      if (!address.street.trim()) newErrors.street = true;
      if (!address.house.trim()) newErrors.house = true;
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isDeliveryValid =
    delivery !== 'courier' ||
    (address.city.trim() && address.street.trim() && address.house.trim());

  const isFormValid =
    form.lastName.trim() &&
    form.firstName.trim() &&
    form.phone.length === 18 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    isDeliveryValid;

  const createOrder = (status: string) => {
    const order = {
      id: Date.now(),
      customer: form,
      delivery,
      payment,
      items: cartItems,
      totalCount,
      totalPrice,
      status,
      createdAt: new Date().toISOString(),
      deliveryDetails: {
        type: delivery,
        address: delivery === 'courier' ? address : null,
      },
    };

    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([order, ...savedOrders]));

    clearCart();
    setIsModalOpen(true);
    setIsPaying(false);
  };

  const handleSubmit = () => {
    if (totalCount === 0) return;
    if (!validate()) return;

    if (payment === 'card') {
      setIsPaymentModalOpen(true);
    } else {
      createOrder('pending');
    }
  };

  return (
    <section className={styles.checkout}>
      <div className={styles.container}>

        {/* ДОСТАВКА */}
        <div className={styles.step}>
          <h2><span>ЭТАП 1</span> УКАЖИТЕ ТИП ДОСТАВКИ</h2>

          <div className={styles.deliveryBlock}>
            <div className={styles.deliveryOptions}>
              <button
                className={delivery === 'courier' ? styles.active : ''}
                onClick={() => setDelivery('courier')}
              >
                <span>КУРЬЕРОМ</span>
                <small>1299 ₽</small>
              </button>

              <button
                className={delivery === 'post' ? styles.active : ''}
                onClick={() => setDelivery('post')}
              >
                <span>ПОЧТА</span>
                <small>БЕСПЛАТНО</small>
              </button>

              <button
                className={delivery === 'pickup' ? styles.active : ''}
                onClick={() => setDelivery('pickup')}
              >
                <span>ПУНКТ ВЫДАЧИ</span>
                <small>БЕСПЛАТНО</small>
              </button>
            </div>

            <div className={styles.deliveryDetails}>
              {delivery === 'courier' ? (
                <div className={styles.addressGrid}>
                  <input
                    placeholder="ГОРОД"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className={`${styles.input} ${errors.city ? styles.error : ''}`}
                  />

                  <input
                    placeholder="УЛИЦА"
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    className={`${styles.input} ${errors.street ? styles.error : ''}`}
                  />

                  <input
                    placeholder="ДОМ"
                    value={address.house}
                    onChange={(e) =>
                      setAddress({ ...address, house: e.target.value })
                    }
                    className={`${styles.input} ${errors.house ? styles.error : ''}`}
                  />

                  <input
                    placeholder="КВАРТИРА"
                    value={address.apartment}
                    onChange={(e) =>
                      setAddress({ ...address, apartment: e.target.value })
                    }
                    className={styles.input}
                  />
                </div>
              ) : (
                <div className={styles.map}>
                  <span>ВЫБЕРИТЕ ПУНКТ НА КАРТЕ</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ФОРМА */}
        <div className={styles.step}>
          <h2><span>ЭТАП 2</span> ЛИЧНЫЕ ДАННЫЕ</h2>

          <div className={styles.formGrid}>
            <input
              placeholder="ФАМИЛИЯ"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              className={`${styles.input} ${errors.lastName ? styles.error : ''}`}
            />

            <input
              placeholder="ИМЯ"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              className={`${styles.input} ${errors.firstName ? styles.error : ''}`}
            />

            <input
              placeholder="ОТЧЕСТВО"
              value={form.middleName}
              onChange={(e) =>
                setForm({ ...form, middleName: e.target.value })
              }
              className={styles.input}
            />

            <IMaskInput
              mask="+{7} (000) 000-00-00"
              placeholder="ТЕЛЕФОН"
              value={form.phone}
              onAccept={(value) =>
                setForm({ ...form, phone: value })
              }
              className={`${styles.input} ${errors.phone ? styles.error : ''}`}
            />

            <input
              type="email"
              placeholder="EMAIL"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
            />
          </div>
        </div>

        {/* ОПЛАТА */}
        <div className={styles.step}>
          <h2><span>ЭТАП 3</span> ОПЛАТА</h2>

          <div className={styles.paymentOptions}>
            <button
              className={payment === 'card' ? styles.active : ''}
              onClick={() => setPayment('card')}
            >
              КАРТОЙ
            </button>

            <button
              className={payment === 'cash' ? styles.active : ''}
              onClick={() => setPayment('cash')}
            >
              НАЛИЧНЫМИ
            </button>
          </div>
        </div>

        <div className={styles.summary}>
          <p>Товаров: {totalCount}</p>
          <p>Сумма: {totalPrice} ₽</p>
        </div>

        {totalCount === 0 && (
          <p className={styles.emptyCartText}>
            Корзина пуста
          </p>
        )}

        <button
          className={styles.submit}
          onClick={handleSubmit}
          disabled={!isFormValid || totalCount === 0 || isPaying}
        >
          {isPaying ? 'ОПЛАТА...' : 'ОФОРМИТЬ ЗАКАЗ'}
        </button>

        {isPaymentModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>ОПЛАТА КАРТОЙ</h2>

              <input placeholder="Номер карты" className={styles.input} />
              <input placeholder="MM/YY" className={styles.input} />
              <input placeholder="CVV" className={styles.input} />

              <button
                className={styles.modalButton}
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  createOrder('paid');
                }}
              >
                ОПЛАТИТЬ {totalPrice} ₽
              </button>

              <button
                className={styles.closeButton}
                onClick={() => setIsPaymentModalOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>
                {payment === 'card'
                  ? 'ОПЛАТА ПРОШЛА'
                  : 'ЗАКАЗ ПРИНЯТ'}
              </h2>

              <p>Спасибо за покупку!</p>

              <button
                className={styles.modalButton}
                onClick={() => {
                  setIsModalOpen(false);
                  navigate('/');
                }}
              >
                НА ГЛАВНУЮ
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Checkout;