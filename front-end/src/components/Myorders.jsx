import React, { useEffect } from 'react';
import axios from 'axios';

export default function Myorders() {
    const url = 'http://localhost:5000'

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/',
            withCredentials: true
        }).then((response) => {
            console.log(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <div>
            <h1>My Order Show</h1>

        </div>
    )
}
