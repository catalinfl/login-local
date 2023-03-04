import React, { useEffect, useState } from 'react'

type InfoType = {
    fname: string,
    lname: string
}

const Details = () => {

    const initial = {
        fname: "",
        lname: ""
    }

    const [data, setData] = useState<InfoType>(initial);

    function useFetch() {
    fetch("http://localhost:5000/userData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            token: window.localStorage.getItem("token")
        })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userData")
            setData(data.data);
        })
    }

    useEffect(() => {
        useFetch()
    }, [])


        return (
        <div>
            <p> name </p> 
            <p> { data.fname } </p>
            <p> persoana </p> 
            <p> { data.lname } </p>
        </div>
    )
}

export default Details