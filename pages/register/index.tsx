import styles from "../../styles/pages/Register/Register.module.css"
import axios from "axios";
import { useFormik } from 'formik';
import { useState } from "react";
import  router  from "next/router";

interface IRegister{
    name: string,
    username: string,
    password: string
}
interface IErrors{
    name: string,
    username: string,
    password: string
}

const Register = () => {

    const [success, setSuccess] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const client = axios.create({
        baseURL: "https://localhost:7033/api/UsersAuth/register" 
      });
    
      const AddPost = (formObject:IRegister) => {
        client
            .post('', formObject)
            .then((response) => {
                console.log(response.data)
                if (response.data.isSuccess){
                    setSuccess("Success")
                    setIsSuccess(true);
                    setTimeout(() => {
                        setSuccess("")
                        router.push("/login")
                    }, 2000)
                } 
            }).catch((error) => {
            console.log(error);
            setIsSuccess(false)
         });
      };

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
 
    const validate = (values : IRegister) => {
      return sleep(500).then(() => {

        const errors = {} as IErrors;
        if (values.name == ""){
            errors.name = "Required"
        }

        if (values.username ==""){
            errors.username = "Required"
        }

        if (values.password =="") {
            errors.password = 'Required';
        } else if (values.password.length < 6){
            errors.password = 'Password must be minimum of lenght 6 of any character';
        }

        return errors;
      });
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            password: ""
        },
        validate,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            AddPost(values)
            formik.resetForm();
            if (!isSuccess) {
                setSuccess("Network error")
            } 
        },
    });

    return (
        <>
        <div className={styles.container}>
            <div className={styles.register}> Register </div>
            <form className={styles.formcontainer} onSubmit={formik.handleSubmit}>

                <label className={styles.label} htmlFor="name">Name</label>
                <input
                    className={styles.roundedcorners}
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name ? <div className={styles.error}>{formik.errors.name}</div> : <div className={styles.error}></div>}

                <label className={styles.label} htmlFor="title">Username</label>
                <input
                    className={styles.roundedcorners}
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                {formik.errors.username ? <div className={styles.error}>{formik.errors.username}</div> : <div className={styles.error}></div>}

                <label className={styles.label} htmlFor="isbn">Password</label>
                <input
                    className={styles.roundedcorners}
                    id="password"
                    name="password"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? <div className={styles.error}>{formik.errors.password}</div> : <div className={styles.error}></div>}

                <span><button type="submit">Submit</button>&nbsp;<button type="button" onClick={()=> router.push("/login")}>Cancel</button></span>
                <div className={styles.success} style={isSuccess ? {color: "green"} : {color: "red"}}>{success}</div>
            </form>
        </div>
        </>
    )
}
export default Register;
