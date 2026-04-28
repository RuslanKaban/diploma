import styles from "./Header.module.css";
import { FaShoppingCart, FaRegUser, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    navigate(`/search?query=${searchValue.trim()}`);
    setSearchValue('');
  };

  return (
    <header className={styles.header}>

      <Link to="/" className={styles.logo}>
        TUR
      </Link>

      <div className={styles.search}>
        <input
          type="text"
          placeholder="Поиск"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />

        <button className={styles.searchButton} onClick={handleSearch}>
          <FaSearch className={styles.searchIcon} />
        </button>
      </div>

      <nav className={styles.nav}>
        <Link to="/about" className={styles.link}>О НАС</Link>
        <Link to="/categories" className={styles.link}>КАТАЛОГ</Link>
        <Link to="/checkout" className={styles.link}>ДОСТАВКА</Link>

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