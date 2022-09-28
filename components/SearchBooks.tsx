import styles from "../styles/components/SearchBooks.module.css"
import axios from "axios";
import { useState } from "react";
import router from "next/router";

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

interface ISearch {
  handleSearchData: (dtata: IBookGet[])=> void
}

const SearchBooks: React.FC<ISearch> = (props) =>{

  const [searchTxt, setSearchTxt] = useState("");

  const searchHandler = (event:any) => {

    const getData = async () => {
      try {
        const response = await axios.get(`https://localhost:7033/book/${searchTxt||"9search9"}`);
        console.log(response.data.result);
        props.handleSearchData(response.data.result)
      } catch (err: any) {
        console.log(err.message);
        //alert(err.message)
      } finally {
      }
    };
    getData();
    
  }

  return (
    <div className={styles.container}>
      <input className={styles.item} type="text" onChange={(event)=>setSearchTxt(event.target.value)} placeholder="Search..."></input>
      <button onClick={searchHandler}>Go</button>
    </div>
  );

}
export default SearchBooks;