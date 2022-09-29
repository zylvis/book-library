import styles from "../styles/components/BookForm.module.css"
import { useFormik } from 'formik';
import axios from "axios";
import { useEffect, useState } from "react";

interface IBookFormSchema{
    author: string;
    title: string;
    isbn: number;
    year: number;
    publisher: string;
    genre: string;
}

interface IErrors{
    author: string;
    title: string;
    isbn: string;
    year: string;
    publisher: string;
    genre: string;
}

interface IBookFormProps{
    bookFormHandler: (show: boolean) => void
}

const BookForm =(props: IBookFormProps) => {

    const [success, setSuccess] = useState("");

    const client = axios.create({
        baseURL: "https://localhost:7033/api/BookAPI" 
      });
    
      const AddPost = (formObject:IBookFormSchema) => {
        client
           .post('', formObject)
           .then((response) => {
                console.log(response.data)
                if (response.data.isSuccess){
                    setSuccess("Success")
                    setTimeout(() => {
                        setSuccess("")
                    }, 2000)
                }
           }).catch((error) => {
            console.log(error);
         });
      };

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
 
    const validate = (values : IBookFormSchema) => {
      return sleep(500).then(() => {
        const errors = {} as IErrors;
        if (values.author == ""){
            errors.author = "Required"
        }

        if (values.title ==""){
            errors.title = "Required"
        }

        if (!values.isbn) {
            errors.isbn = 'Required';
        } else if (values.isbn.toString().length < 13){
            errors.isbn = 'Enter valid ISBN number';    
        }

        if (!values.year){
            errors.year = "Required"
        } else if ( values.year.toString().length != 4){
            errors.year = "Enter valid year"
        }

        if (values.publisher ==""){
            errors.publisher = "Required"
        }

        if (values.genre ==""){
            errors.genre = "Required"
        }

        return errors;
      });
    };

    const formik = useFormik({
        initialValues: {
            author: "",
            title: "",
            isbn: 0,
            year: 0,
            publisher: "",
            genre: ""

        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            AddPost(values)

            formik.resetForm();
        },
    });

    setTimeout(() => {
        <div>Success</div>
      }, 1000);

    return (
        <div className={styles.container}>
            <form className={styles.formcontainer} onSubmit={formik.handleSubmit}>

                <label className={styles.label} htmlFor="author">Author</label>
                <input
                    className={styles.roundedcorners}
                    id="author"
                    name="author"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.author}
                />
                {formik.errors.author ? <div className={styles.error}>{formik.errors.author}</div> : <div className={styles.error}></div>}

                <label className={styles.label} htmlFor="title">Title</label>
                <input
                    className={styles.roundedcorners}
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                {formik.errors.title ? <div className={styles.error}>{formik.errors.title}</div> : <div className={styles.error}></div>}

                <label className={styles.label} htmlFor="isbn">ISBN</label>
                <input
                    className={styles.roundedcorners}
                    id="isbn"
                    name="isbn"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.isbn}
                />
                {formik.errors.isbn ? <div className={styles.error}>{formik.errors.isbn}</div> : <div className={styles.error}></div>}

                <label className={styles.label} htmlFor="year">Year</label>
                <input
                    className={styles.roundedcorners}
                    id="year"
                    name="year"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.year}
                />
                {formik.errors.year ? <div className={styles.error}>{formik.errors.year}</div> : <div className={styles.error}></div>}

                <label className={styles.label} htmlFor="publisher">Publisher</label>
                <input
                    className={styles.roundedcorners}
                    id="publisher"
                    name="publisher"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.publisher}
                />
                {formik.errors.publisher ? <div className={styles.error}>{formik.errors.publisher}</div> : <div className={styles.error}></div>}

                <label className={styles.label} htmlFor="genre">Genre</label>
                <input
                    className={styles.roundedcorners}
                    id="genre"
                    name="genre"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.genre}
                />
                {formik.errors.genre ? <div className={styles.error}>{formik.errors.genre}</div> : <div className={styles.error}></div>}

                <span><button type="submit">Submit</button>&nbsp;<button onClick={() => props.bookFormHandler(false)} type="button">Cancel</button></span>
                <div className={styles.success}>{success}</div>
            </form>
        </div>
    );
}
export default BookForm;