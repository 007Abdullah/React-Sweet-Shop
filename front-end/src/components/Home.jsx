import { useState, useEffect } from 'react';
import axios from 'axios';
// const url = 'http://localhost:5000'
function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: "http://localhost:5000/profile",
            credentials: true,
        }).then((response) => {
            console.log(response);
        //    response.data.profile.name
           
        }, (error) => {
            console.log(error.message);
        });

    }, [])

    return (
        <>
            <h1>Home</h1>
            
           

        </>
    )
}

export default Home;