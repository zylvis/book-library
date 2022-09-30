import axios from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import router from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import Login from './login'

const Home: NextPage = () => {

  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('accessToken')?.toString();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (!token){
      delete axios.defaults.headers.common["Authorization"];
      router.push("/login")
    } else {
      setShowLogin(false)
    }
  }, [])

  const loginHandler = (show:boolean) => {
    setShowLogin(show)
  }

  const objLogin = {loginHandler: loginHandler};

  return (
    <>
      {showLogin && <Login {...objLogin} />}
      <div className={styles.container}>
        
        <Header />
        <div className={styles.navbutton}>
          <Link  href="/books">
            <button className={styles.books}>Books</button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default Home
