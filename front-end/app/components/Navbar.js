import Image from 'next/image'
import styles from './navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.nav}>
                <div className={styles.container}>
                    
                    <div className={styles.search}>
                        <input type="text" className={styles.input} placeholder="Search..." />
                        <button className={styles.btn}>
                        <Image
           src="/Images/search-icon.png"
            alt="Description of the first image"
            width={20}
            height={20}
          />
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