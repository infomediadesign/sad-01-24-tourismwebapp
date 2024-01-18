import React from 'react'
import styles from '../components/saveditem.module.css'

export default function SavedItems() {
    return (
        <div>
            <div className={styles.container}>
                <header>
                    <h1>MY LIST</h1>
                    <button className={styles.removeBtn}>REMOVE LIST</button>
                </header>
                <div className={styles.imageCollage}>
                    <div className={styles.imageItem}>
                        <img src='/images/Greece.jpg' alt="Greece" />
                        <p>Greece</p>
                    </div>
                    <div className={styles.imageItem}>
                        <img src="/images/Cochem.jpg" alt="Cochem" />
                        <p>Cochem</p>
                    </div>
                    <div className={styles.imageItem}>
                        <img src="/images/Amsterdam.jpg" alt="Amsterdam" />
                        <p>Amsterdam</p>
                    </div>
                </div>
                <aside>
                    <h3>All saved items (3)</h3>
                </aside>
            </div>
        </div>
    )
}