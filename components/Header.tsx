import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/components/Header.module.css'
import ParseJWT from "../helpers/ParseJWT"
import router from 'next/router';

const Header = () => {

    const[isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken")?.toString();
        if (token == undefined){
        router.push('/')
        }
        console.log(ParseJWT(token))
        const obj = ParseJWT(token)

        obj.role == "admin" ? setIsAdmin(true) : setIsAdmin(false)

    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("accessToken");
    }

    const admin = (
        <Link href="/manager"><button id={styles.button}>Manager</button></Link>
    )

    return (
        <div className={styles.container}>
            <Link href="/"><div className={styles['ibooklibrary-label']}>|IBooklibrary</div></Link>
            {isAdmin && admin}
            <Link href="/login"><button id={styles.button} onClick={logoutHandler}>Logout</button></Link>
        </div>
    )
}
export default Header;