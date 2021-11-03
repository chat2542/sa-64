import React, { useState, useEffect } from 'react'
const Home = () => {
    const [islogin, setIsLogin] = useState(false)
    const [name, setName] = useState("")
    const getStudent = async () => {
        const reponse = await fetch("http://localhost:8080/api/student", {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        });

        const content = await reponse.json()
        console.log(content)
        if (content.message) {
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }
        setName(content.Code + " " + content.Prefix + content.FirstName + " " + content.LastName)
    }

    useEffect(() => {
        getStudent()
    }, [])

    return (
        <div style={{justifyItems: 'flex-end', alignItems: "flex-end"}}>
        {islogin ? 'Hi ' + name : 'You are not logged in'}
        </div>
        )
}
export default Home