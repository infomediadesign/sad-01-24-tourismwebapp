'use client'
import { useEffect, useState } from 'react'
import styles from '../components/saveditem.module.css'
import { useRouter } from 'next/navigation'

export default function SavedItems() {
  const [saveItems, setSaveItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:7000/users/auth', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Success") {
          router.push('/saveditems')
          // toast.success("Login Successful")
          console.log(data);
        } else {
          router.push('/')
        }
      })
      .catch((error) => console.error(error));
  }, [])

  useEffect(() => {
    fetch('http://localhost:7000/saveditems')
      .then(res => res.json())
      .then(data => {
        setSaveItems(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div>
          <img src='/images/paris.jpg' alt="eiffel-tower" style={{ width: '100%', height: 'auto' }} />
        </div>
        <header className={styles.header}>

          <h1>MY LIST ({saveItems.length}) </h1>
          <div className={styles.headerContent}>
            <button className={styles.removeBtn}>REMOVE LIST</button>
          </div>
        </header>

        <div className={styles.imageCollage}>
          {saveItems.map((item, index) =>
            <div className={styles.imageItem}>
              <img src={`http://localhost:9000/images/${item.image}`} alt={item.place}
                className={styles.horizontalImage} />
              <p>{item.place}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
