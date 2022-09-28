import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/components/RegisteredList.module.css";
import DateToSimple from "../helpers/DateToSimple"

interface IRegisteredListProps{
    show: boolean,
    showListHandler: (show: boolean) => void,
}

interface IData{
    id: number,
    userId: string,
    bookId: number,
    name: string,
    userName: string,
    date: Date,
}

const RegisteredList = (props: IRegisteredListProps) => {

    const [dataToShow, setDataToShow] = useState<IData[]>([]);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`https://localhost:7033/api/ReturnRegisterAPI`);
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
      },[props.show])

    const handlingDelete = (id: number) => {
        axios.delete(`https://localhost:7033/api/ReturnRegisterAPI/${id}`)  
        .then(res => {  
        console.log(res.data); 
        const posts = dataToShow.filter(item => item.id !== id);  
        setDataToShow(posts);  
      }).catch( error =>
        console.log(error)
      )
    }
    

const list = (
    <div className={styles.container}>
        
        <button className={styles.btnclose} onClick={()=> props.showListHandler(false)}>Close</button>
        <div className={styles.labeltxt}>Return Register List</div>
        <table className={styles["container-items"]}> 
             <thead>
                <tr>
                    <th className={styles.th}></th>
                    <th className={styles.th}>Book Id</th>
                    <th className={styles.th}>User Id</th>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Username</th>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}></th>
                </tr>
             </thead>
             <tbody>
                {dataToShow.map((item, index: number) => { return (
                <tr key={item.id}>
                    <td className={styles.item}>{index + 1}.</td>
                    <td className={styles.item}>{item.bookId}</td>
                    <td className={styles.item}>{item.userId}</td>
                    <td className={styles.item}>{item.name}</td>
                    <td className={styles.item}>{item.userName}</td>
                    <td className={styles.item}>{DateToSimple(item.date.toString())}</td>
                    <td className={styles.item}><button onClick={()=> handlingDelete(item.id)}>Delete</button></td>
                </tr>);
                })}
             </tbody>
         </table>
    </div>
)

    return(
        <> 
            {props.show && list}
        </>
    )
}
export default RegisteredList;