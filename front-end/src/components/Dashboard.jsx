import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from "./../context/globalContext";
import {
    useHistory
} from "react-router-dom";
// const url = 'http://localhost:5000'

function Dashboard() {

    let url = 'http://localhost:5000'
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    let history = useHistory()

    // let [userData, setUserData] = useState()
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: url + '/profile',
    //         withCredentials: true
    //     }).then((response) => {
    //         // alert(response.data.message)
    //         console.log(response.data.profile)
    //         setUserData(response.data.profile)
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }, [])

    function logout() {
        axios({
            method: 'post',
            url: url + '/auth/logout',
            withCredentials: true,
        }).then((response) => {
            console.log(response);
            history.push('./login')
        }, (error) => {
            console.log(error.message);
        });

    }
    return (
        <>
            <button onClick={logout}>Logout</button>
            <h1>Dashboard</h1>
            {globalState.user ?
                <div>
                    <h2>{globalState.user.name}</h2>
                </div> : null}

        </>
    )
}

export default Dashboard;