import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { NextPage } from 'next/types';
import { useState } from 'react';
import styles from '../../styles/Login/Login.module.css'

interface IAthleteeProps{
    loginHandler: (show: boolean) => void
}

const Login: React.FC<IAthleteeProps> = (props) => {

const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [loginSuccess, setLoginSuccess] = useState(false);

const client = axios.create({
    baseURL: "https://localhost:7033/api/UsersAuth/login" 
  });

  const AddPost = (userName: string, password : string) => {
    client
       .post('', {
            userName: userName,
            password: password
        })
       .then((response) => {
            console.log(response.data.result.token)
            //console.log(response.data.isSuccess)
            localStorage.setItem('accessToken', response.data.result.token);
            //props.loginHandler(!response.data.isSuccess);
            Router.push("/")

       }).catch((error) => {
        console.log(error);
        if(error.code =="ERR_NETWORK"){
            setErrorMessage("Network error")
        } else {
            setErrorMessage(error.response.data.errorMesseges[0]);
            console.log(error.response.data.errorMesseges[0]);
        }

     });
  };




const formHandler =(event:any) => {

    event.preventDefault();
    AddPost(userName, password);
    setUserName("");
    setPassword("");
    

}

const login = 
    <div className={styles.container}>
        <div className={styles["login-label"]}>Login</div>
        <form onSubmit={formHandler} className={styles.formcontainer}>
            <div style={{color: "red"}}>{errorMessage}</div>
            <label>User Name</label>
            <input id={styles.roundedcorners} type="text" value={userName} onChange={(event) => setUserName(event.target.value)}></input>
            <label>Password</label>
            <input id={styles.roundedcorners} type="text" value={password} onChange={(event) => setPassword(event.target.value)}></input>
            <div>
                <button className={styles.button} type="submit">OK</button>
            </div>
            <Link href="/register"><div className={styles.register}>Click to Register</div></Link>
        </form>
    </div>


    return(
        <>
            {login}
        </>
    )
}
export default Login;