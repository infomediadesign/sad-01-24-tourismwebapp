import React from 'react';
import './styles.css'; // Assuming your CSS file is in src/ and named styles.css
import styles from './saveditem.module.css'

class MyList extends React.Component {
  // Add any state or methods you need here

  render() {
    return (
      <div className={styles.container}>
        <header>
          <h1>MY LIST</h1>
          <button className={styles.remove-btn}>REMOVE LIST</button>
        </header>
        <div className={styles.image-collage}>
          <div className={styles.image-itemU}>
            <img src="greece.jpg" alt="Greece" />
            <p>Greece</p>
          </div>
          <div className={styles.image-item}>
            <img src="cochem.jpg" alt="Cochem" />
            <p>Cochem</p>
          </div>
          <div className={styles.image-item}>
            <img src="amsterdam.jpg" alt="Amsterdam" />
            <p>Amsterdam</p>
          </div>
        </div>
        <aside>
          <h3>All saved items (3)</h3>
        </aside>
      </div>
    );
  }
}

export default MyList;