import Image from 'next/image'
import styles from './page.module.css'
import AddCountryPopup from './components/AddCountryPopup'

export default function Home() {
  return (
    <>
      <h1>Hello !</h1>
      <AddCountryPopup />
    </>
  )
}
