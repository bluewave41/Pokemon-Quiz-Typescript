import styles from './NavBar.module.css';
import Link from 'next/Link';

const NavBar = () => {
    return (
        <div className={styles.nav}>
            <Link href="/home"><a>Home</a></Link>
            <Link href="/login"><a>Login</a></Link>
            <Link href="/register"><a>Register</a></Link>
        </div>
    )
}

export default NavBar;