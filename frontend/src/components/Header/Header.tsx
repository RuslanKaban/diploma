import styles from "./Header.module.css"
import { FaShoppingCart, FaRegUser, FaSearch } from "react-icons/fa";

const Header = () => {

    return (
        <header className={styles.header}>
            <div className={styles.logo}>TUR</div>

            <div className={styles.search}>
                <input type="text" placeholder="Поиск" />
                <FaSearch className={styles.searchIcon} />

            </div>

            <nav className={styles.nav}>
                <a href="/about">О НАС</a>
                <a href="/catalog">КАТАЛОГ</a>
                <a href="/delivery">ДОСТАВКА</a>

                <div className={styles.icons}>
                    <div className={styles.iconCircle}>
                        <FaShoppingCart size={24} />
                    </div>
                    <div className={styles.iconCircle}>
                        <FaRegUser size={24} />
                    </div>
                </div>
            </nav>
        </header>
    );
};


export default Header