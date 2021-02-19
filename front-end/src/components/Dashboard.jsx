import { useState, useEffect } from 'react';
import axios from 'axios';
// const url = 'http://localhost:5000'

function Dashboard() {
    let url = 'http://localhost:5000'
    let [userData, setUserData] = useState()
    useEffect(() => {
        axios({
            method: 'get',
            url: url + '/profile',
            withCredentials: true
        }).then((response) => {
            // alert(response.data.message)
            console.log(response.data.profile)
            setUserData(response.data.profile)
        }).catch((error) => {
            console.log(error);
        });
    }, [])
    console.log(userData)
    return (
        <>
            <div>
                {userData ?
                    <div>
                        <h2 style={{textAlign:'center'}}>WelCome , {userData.name}</h2>
                    </div> : null}
            </div>
        </>
    )
}

export default Dashboard;