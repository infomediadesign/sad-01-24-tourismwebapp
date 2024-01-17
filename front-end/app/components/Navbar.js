import Image from 'next/image'
import styles from './navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.nav}>
                <div className={styles.container}>
                    
                    <div className={styles.search}>
                        <input type={styles.text} className={styles.input} placeholder="Search..." />
                        <button className={styles.btn}>
                        
                        </button>
                    </div>
                    <ul>
                        <li>
                            <a href="#">Destination</a>
                        </li>
                        <li>
                            <a href="#">About Us</a>
                        </li>
                        <li>
                            <a href="#">Sign In</a> 
                        </li>
                    </ul>
                </div>
            </nav>
    )
}
export default Navbar;