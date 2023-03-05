import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

type InfoType = {
    fname: string,
    lname: string,
    email: string
}

const Details = () => {

    const initial = {
        fname: "",
        lname: "",
        email: ""
    }

    const [data, setData] = useState<InfoType | string>(initial);

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
            if (data === "token expired") {
                alert("Token expired again")
                window.localStorage.clear();
                window.location.href = "/"
            }
        })
    }

    
    
    useEffect(() => {        
        if (data === "token expired") { 
            <Navigate to="/blabla" />
        }
    }, [data])


    const logOut = () => {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("loggedIn")
        window.location.href="./sign-in"
    }

    useEffect(() => {
        useFetch()
    }, [])



        return (
            (typeof(data) === "object") ? 
            <div className="test"> 
            <p> {data.lname} </p>
            <p> {data.email} </p>
            </div> 
         :
         <p> You are not logged in </p>
    )
}

export default Details