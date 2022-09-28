import Link from 'next/link';
import styles from '../styles/components/Header.module.css'

const Header = () => {

    const logoutHandler = () => {
        localStorage.removeItem("accessToken");
    }

    return (
        <div className={styles.container}>
            <Link href="/"><div className={styles['ibooklibrary-label']}>IBookLibrary</div></Link>
            <Link href="/manager"><button id={styles.button}>Manager</button></Link>
            <Link href="/login"><button id={styles.button} onClick={logoutHandler}>Logout</button></Link>
        </div>
    )
}
export default Header;