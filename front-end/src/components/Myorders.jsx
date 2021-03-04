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
            // console.log(response.data.data)
            setData(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    console.log("chal beta ", getdata)
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
                        {getdata.map((e) => (
                            <tr>
                                <th></th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>


            </MDBRow>
        </MDBContainer>
    )
}
