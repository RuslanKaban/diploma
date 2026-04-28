import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';

import cdekIcon from '../../assets/map/cdek.png';
import postIcon from '../../assets/map/post.png';

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

  const [selectedPoint, setSelectedPoint] = useState('');
  const [activeStep, setActiveStep] = useState<'cart' | 'checkout'>('checkout');
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

  useEffect(() => {
    if (delivery === 'courier') return;

    // @ts-ignore
    if (!window.ymaps) return;

    // @ts-ignore
    window.ymaps.ready(() => {
      const mapElement = document.getElementById('map');

      if (!mapElement || mapElement.childNodes.length > 0) return;

      // @ts-ignore
      const map = new window.ymaps.Map('map', {
        center: [43.1155, 131.8855],
        zoom: 11,
      });

      const points = [
        { coords: [43.119195, 131.884736], name: 'СДЭК — Мордовцева 3', type: 'cdek' },
        { coords: [43.115011, 131.890352], name: 'Почта — Светланская 41', type: 'post' },
        { coords: [43.113556, 131.895429], name: 'СДЭК — Светланская 56', type: 'cdek' },
        { coords: [43.128266, 131.896381], name: 'СДЭК — Проспект Красного знамени 34', type: 'cdek' },
      ];

      points.forEach((point) => {
        const icon = point.type === 'cdek' ? cdekIcon : postIcon;

        // @ts-ignore
        const placemark = new window.ymaps.Placemark(
          point.coords,
          {
            balloonContent: point.name,
          },
          {
            iconLayout: 'default#image',
            iconImageHref: icon,
            iconImageSize: [32, 32],
            iconImageOffset: [-16, -32],
          }
        );

        placemark.events.add('click', () => {
          setSelectedPoint(point.name);
        });

        map.geoObjects.add(placemark);
      });
    });
  }, [delivery]);

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

    if (delivery !== 'courier' && !selectedPoint) {
      newErrors.selectedPoint = true;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isDeliveryValid =
    delivery === 'courier'
      ? address.city.trim() && address.street.trim() && address.house.trim()
      : selectedPoint;

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
        address: delivery === 'courier' ? address : selectedPoint,
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
        <div className={styles.toggleWrapper}>
          <div className={styles.toggleButtons}>
            <button
              className={styles.stepButton}
              onClick={() => navigate('/cart')}
            >
              КОРЗИНА
            </button>

            <span className={styles.separator}>\</span>

            <button className={`${styles.stepButton} ${styles.stepButtonActive}`}>
              ДОСТАВКА
            </button>
          </div>
        </div>

        <div className={styles.step}>
          <h2>
            <span>ЭТАП 1</span> УКАЖИТЕ ТИП ДОСТАВКИ
          </h2>
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
                onClick={() => {
                  setDelivery('post');
                  setSelectedPoint('');
                }}
              >
                <span>ПОЧТА</span>
                <small>БЕСПЛАТНО</small>
              </button>

              <button
                className={delivery === 'pickup' ? styles.active : ''}
                onClick={() => {
                  setDelivery('pickup');
                  setSelectedPoint('');
                }}
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
                    className={`${styles.input} ${errors.city ? styles.error : ''
                      }`}
                  />

                  <input
                    placeholder="УЛИЦА"
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    className={`${styles.input} ${errors.street ? styles.error : ''
                      }`}
                  />

                  <input
                    placeholder="ДОМ"
                    value={address.house}
                    onChange={(e) =>
                      setAddress({ ...address, house: e.target.value })
                    }
                    className={`${styles.input} ${errors.house ? styles.error : ''
                      }`}
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
                <>
                  <div
                    className={`${styles.map} ${errors.selectedPoint ? styles.error : ''
                      }`}
                  >
                    <div id="map" className={styles.mapInner} />
                  </div>

                  {selectedPoint && (
                    <p className={styles.selectedPoint}>
                      Выбран: {selectedPoint}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles.step}>
          <h2>
            <span>ЭТАП 2</span> ЛИЧНЫЕ ДАННЫЕ
          </h2>

          <div className={styles.formGrid}>
            <input
              placeholder="ФАМИЛИЯ"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              className={`${styles.input} ${errors.lastName ? styles.error : ''
                }`}
            />

            <input
              placeholder="ИМЯ"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              className={`${styles.input} ${errors.firstName ? styles.error : ''
                }`}
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
              onAccept={(value) => setForm({ ...form, phone: String(value) })}
              className={`${styles.input} ${errors.phone ? styles.error : ''
                }`}
            />

            <input
              type="email"
              placeholder="EMAIL"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`${styles.input} ${errors.email ? styles.error : ''
                }`}
            />
          </div>
        </div>

        <div className={styles.step}>
          <h2>
            <span>ЭТАП 3</span> ОПЛАТА
          </h2>

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
          <p className={styles.emptyCartText}>Корзина пуста</p>
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
              <button
                className={styles.closeButton}
                onClick={() => setIsPaymentModalOpen(false)}
              >
                ✕
              </button>

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
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>{payment === 'card' ? 'ОПЛАТА ПРОШЛА' : 'ЗАКАЗ ПРИНЯТ'}</h2>

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