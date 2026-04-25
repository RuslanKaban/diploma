import styles from './Footer.module.css'
import { FaInstagram, FaTelegram, FaVk } from "react-icons/fa";
import Support from '../Support/Support';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.support}><Support /></div>
            <div className={styles.left}>
                <p className={styles.title}>ИЩИТЕ НАС</p>
                <div className={styles.socialIcons}>
                    <a href="https://www.instagram.com/"><FaInstagram size={32} /></a>
                    <a href="https://t.me/"><FaTelegram size={32} /></a>
                    <a href="https://vk.com/"><FaVk size={32} /></a>
                </div>
            </div>

            <div className={styles.right}>
                <a href="#">Политика конфиденциальности</a>
                <a href="#">Договор оферты</a>
                <a href="#">Наши партнеры</a>
            </div>
        </footer>
    )
}

export default Footer 