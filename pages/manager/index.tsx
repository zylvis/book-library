import axios from "axios";
import router from "next/router";
import { useEffect } from "react";
import Header from "../../components/Header";

const Manager = () => {

    useEffect(() => {
        const token = localStorage.getItem('accessToken')?.toString();
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        if (!token){
          delete axios.defaults.headers.common["Authorization"];
          router.push("/login")
        } else {
        }
      }, [])
      
    return (
        <>
            <Header/>
        </>
    );
}
export default Manager;