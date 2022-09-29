import styles from "../../styles/pages/manager/Manager.module.css"
import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import DateToSimple from "../../helpers/DateToSimple"
import RegisteredList from "../../components/RegisteredList";
import Modal from "../../components/Modal";
import BookForm from "../../components/BookForm";

interface IBorrowing{
  id: number,
  userID: string,
  bookID: number,
  name: string,
  date: string
}

interface IRegisterObj{
  userId: string,
  bookId: number
}

const Manager = () => {

  const [dataToShow, setDataToShow] = useState<IBorrowing[]>([]);
  const [showRegisteredList, setShowRegisteredList] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false)

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

    const clientRegister = axios.create({
      baseURL: "https://localhost:7033/api/ReturnRegisterAPI" 
    });
  
    const AddRegisterPost = (registerObj: IRegisterObj) => {
      clientRegister
         .post('', registerObj)
         .then((response) => {
            console.log(response.data)  
         }).catch((error) => {
            console.log(error);
       });
    };

    const handlingDelete = (id:number, userId: string, bookId: number) => {
        console.log(bookId)
      axios.delete(`https://localhost:7033/api/BorrowingAPI/${id}`)  
      .then(res => {  
        console.log(res.data); 
        const posts = dataToShow.filter(item => item.id !== id);  
        setDataToShow(posts);  
      }).catch( error =>
        console.log(error)
      )

      AddRegisterPost({userId, bookId});
    }

    const showListHandler = (show:boolean) =>{
      setShowRegisteredList(show)
    }

    const bookFormHandler = (show:boolean) =>{
      setShowBookForm(show)
    }

    const regListObj = {show: showRegisteredList, showListHandler: showListHandler}
    const bookFormObj = {bookFormHandler: bookFormHandler}
      
    return (
      <>
        {showBookForm && <BookForm {...bookFormObj}/>}
        {showBookForm && <Modal/>}
        <RegisteredList {...regListObj}/>
        {showRegisteredList && <Modal/>}
        <Header/>
        <button className={styles.btnregistered} onClick={()=>setShowRegisteredList(true)}>Return Register List</button>
        <button onClick={() => setShowBookForm(true)}>Add Book</button>
        <div className={styles.labeltxt}>Borrowed book list</div>
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
                      <button onClick={()=> handlingDelete(item.id, item.userID, item.bookID)}>Register</button>
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