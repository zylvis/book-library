import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/pages/books/Books.module.css";
import Header from "../../components/Header";
import router from "next/router";
import SearchBooks from "../../components/SearchBooks";

interface IBookGet {
  id: number;
  author: string;
  title: string;
  year: number;
  genre: string;
  publisher: string;
  isbn: number;
  availableStatus: string;
  reserved: boolean;
}

interface IReserveObj{
  BookId: number
}

const Books = () => {
  const [data, setData] = useState<IBookGet[]>([]);
  const [dataToShow, setDataToShow] = useState<IBookGet[]>([]);
  const [tokenJWT, setTokenJWt] = useState("");
  const [reserveObj, setReserveObj] = useState<IReserveObj>();

  useEffect(() => {
    const token = localStorage.getItem("accessToken")?.toString();
    if (token == undefined){
    router.push('/')
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setTokenJWt(token as string);

    const getData = async () => {
      try {
        const response = await axios.get("https://localhost:7033/api/BookAPI");
        setDataToShow(response.data.result);
        setData(response.data.result);
        console.log(response.data.result);
      } catch (err: any) {
        console.log(err.message);
        //alert(err.message)
        setData([]);
      } finally {
      }
    };
    getData();
  }, []);

  const clientReservation = axios.create({
    baseURL: "https://localhost:7033/api/ReservationAPI" 
  });

  const AddReservePost = (reserveObj: IReserveObj) => {
    clientReservation
       .post('', reserveObj)
       .then((response) => {
          console.log(response.data)

       }).catch((error) => {
          console.log(error);
          alert(error.response.data.Message[0]);
     });
  };

  const clientBorrowing = axios.create({
    baseURL: "https://localhost:7033/api/BorrowingAPI" 
  });

  const AddBorrowingPost = (borrowObj: IReserveObj) => {
    clientBorrowing
       .post('', borrowObj)
       .then((response) => {
          console.log(response.data)

       }).catch((error) => {
          console.log(error);
          alert(error.response.data.Message[0]);
     });
  };

  const handleReserveButton = (event:any, id:number) => {
    let obj = {
      BookId: id
    }
    AddReservePost(obj);

    setTimeout(() => {
      window.location.reload();
    }, 500)
    
  }

  const handleBorrowingButton = (event:any, id:number) => {
    let obj = {
      BookId: id
    }
    AddBorrowingPost(obj);

    setTimeout(() => {
      window.location.reload();
    }, 500)
  }

  const handleSearchData = (data : IBookGet[]) => {
    setDataToShow(data);
  }

  const searchObj = {handleSearchData: handleSearchData};
  
  return (
    <>
    <Header/>
    <div className={styles.labeltxt}>Book list</div>
    <div className={styles.search}><SearchBooks {...searchObj}/></div>
    <div className={styles.container}>
      <table className={styles["container-items"]}>
        <thead>
          <tr>
            <th className={styles.border}></th>
            <th className={styles.border}>Author</th>
            <th className={styles.border}>Title</th>
            <th className={styles.border}>Year</th>
            <th className={styles.border}>Genre</th>
            <th className={styles.border}>Publisher</th>
            <th className={styles.border}>ISBN</th>
            <th className={styles.border}>Availability</th>
            <th className={styles.border}></th>
            <th className={styles.border}></th>
          </tr>
        </thead>

        <tbody>
          {dataToShow.map((item: IBookGet, index: number) => {
            return (
              <tr key={item.id}>
                <td className={styles.bookitem}>{index + 1}</td>
                <td className={styles.bookitem}>
                  {item.author}
                </td>
                <td className={styles.bookitem}>
                  {item.title}
                </td>
                <td className={styles.bookitem}>
                  {item.year}
                </td>
                <td className={styles.bookitem}>
                  {item.genre}
                </td>
                <td className={styles.bookitem}>
                  {item.publisher}
                </td>
                <td className={styles.bookitem}>
                  {item.isbn}
                </td>
                <td className={styles.bookitem}>{item.availableStatus}</td>
                <td className={styles.bookitem}>
                  <button style={item.availableStatus == "Unavailable" ? {pointerEvents: "none", backgroundColor: "red"} : {pointerEvents: "auto", backgroundColor: "green"}} onClick={(event) => handleBorrowingButton(event, item.id)}>
                    Borrow
                  </button></td>
                <td className={styles.bookitem}>
                  <button style={item.reserved ? {pointerEvents: "none", backgroundColor: "red"} : {pointerEvents: "auto", backgroundColor: "green"}} onClick={(event) => handleReserveButton(event, item.id)}>
                    Reserve
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </>
  );
};
export default Books;
