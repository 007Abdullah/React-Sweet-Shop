import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState } from "./../context/globalContext";
// const url = 'http://localhost:5000'

function Dashboard() {

    const globalState = useGlobalState();

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

            {userData ?
                <div>
                    <h2 style={{ textAlign: 'center' }}>WelCome , {userData.name}</h2>
                </div> : null}

            {'===>' + JSON.stringify(globalState)}


            {/* {globalState.map((eachItem, i) => {
                return <div key={i} id="card">
                    <p>{eachItem.name}</p>
                </div>

            })
            } */}
        </>
    )
}

export default Dashboard;