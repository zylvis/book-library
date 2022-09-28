import styles from "../../styles/pages/manager/Manager.module.css"
import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import DateToSimple from "../../helpers/DateToSimple"

interface IBorrowing{
  id: number,
  userID: string,
  bookID: number,
  name: string,
  date: string
}

const Manager = () => {

  const [dataToShow, setDataToShow] = useState<IBorrowing[]>([]);
   const [borrowingId, setBorrowingId] = useState<number>(0);

  useEffect(() => {
      const token = localStorage.getItem('accessToken')?.toString();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (!token){
        delete axios.defaults.headers.common["Authorization"];
        router.push("/login")
      } 
      const getData = async () => {
        try {
          const response = await axios.get(`https://localhost:7033/api/BorrowingAPI`);
          setDataToShow(response.data.result);
          console.log(response.data.result);
        } catch (err: any) {
          console.log(err.message);
          //alert(err.message)
          setDataToShow([]);
        } finally {
        }
      };
      getData();
    }, [])



    const handlingDelete = (id:number) => {

      axios.delete(`https://localhost:7033/api/BorrowingAPI/${id}`)  
      .then(res => {  
        console.log(res.data); 
        const posts = dataToShow.filter(item => item.id !== id);  
        setDataToShow(posts);  
      }).catch( error =>
        console.log(error)
      )
    }
      
    return (
      <>
        <Header/>
        <button className={styles.btnregister}>Register Books</button>
        <div className={styles.container}>
          <table className={styles["container-items"]}>
            <thead>
              <tr>
                <th className={styles.th}></th>
                <th className={styles.th}>BookId</th>
                <th className={styles.th}>UserId</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}></th>
              </tr>
            </thead>

            <tbody>     
              {dataToShow.map((item: IBorrowing, index: number) => {
                return (
                  <tr key={item.id}>
                    <td className={styles.item}>{index +1}.</td>
                    <td className={styles.item}>
                      {item.bookID}
                    </td>
                    <td className={styles.item}>
                      {item.userID}
                    </td>
                    <td className={styles.item}>
                      {item.name}
                    </td>
                    <td className={styles.item}>
                      {DateToSimple(item.date)}
                    </td>
                    <td className={styles.item}>
                      <button onClick={()=> handlingDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
}
export default Manager;