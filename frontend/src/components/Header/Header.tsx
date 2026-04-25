import styles from "./Header.module.css";
import { FaShoppingCart, FaRegUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      
      <Link to="/" className={styles.logo}>
        TUR
      </Link>

      <div className={styles.search}>
        <input type="text" placeholder="Поиск" />
        <FaSearch className={styles.searchIcon} />
      </div>

      <nav className={styles.nav}>
        <Link to="/about" className={styles.link}>О НАС</Link>
        <Link to="/categories" className={styles.link}>КАТАЛОГ</Link>
        <Link to="/delivery" className={styles.link}>ДОСТАВКА</Link>

        <div className={styles.icons}>
          <Link to="/cart" className={styles.iconCircle}>
            <FaShoppingCart size={20} />
          </Link>

          <Link to="/profile" className={styles.iconCircle}>
            <FaRegUser size={20} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;