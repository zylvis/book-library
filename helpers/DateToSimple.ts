const DateToSimple = (date: string) : string => {

    const d = new Date (date);


    return `${d.getFullYear()}/${"0" + (d.getMonth() + 1).toString().slice(-2)}/${d.getDate().toString().slice(-2)}`;
}

export default DateToSimple;