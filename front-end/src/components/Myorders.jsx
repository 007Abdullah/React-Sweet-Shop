import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBContainer } from 'mdbreact';

const url = 'http://localhost:5000'
export default function Myorders() {

    const [getdata, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: url + '/myorder',
            withCredentials: true
        }).then((response) => {
            
            setData(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    // getdata.map((v) => {
    //     return (
    //         <>
    //             {v.orders.map((s) => {
    //                 return (

    //                 )
    //             })}
    //         </>
    //     )
    // })
    return (
        <MDBContainer>
            <MDBRow>
                <h1 style={{ textAlign: 'center' }}>My Orders</h1>
                < MDBTable striped >
                    <MDBTableHead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Orders</th>
                            <th>Total Price</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {getdata.map((e, i) => (
                            <tr key={i}>
                                <th>{e._id}</th>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.phonenumber}</td>
                                <td>{e.address}</td>
                                <td>{e.status}</td>
                                <td>{e.orders.length}</td>
                                <td>RS:{e.totalPrice}</td>
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>


            </MDBRow>
        </MDBContainer>
    )
}
