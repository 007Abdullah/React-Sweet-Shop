import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { MDBContainer, MDBRow, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import url from './BaseUrl'
// let url = 'http://localhost:5000'
export default function AdminHistory() {

    const [data, setData] = useState([]);
    const [toggle, settoggle] = useState(true);

    useEffect(() => {
        console.log("runnig")
        axios({
            method: 'get',
            url: url + '/ordercancel',
            withCredentials: true
        }).then((response) => {
            setData(response.data.data)

        }).catch((err) => {
            console.log(err)
        })
    }, [toggle])
    //discuss sir---->


    function updateStatus(id) {
        axios({
            method: 'post',
            url: url + '/updateStatus',
            data: {
                id: id,
                status: "Order confirmed"
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data.message)
            settoggle(!toggle)
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <>
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
                            {data.map((e, i) => (
                                <tr key={i}>
                                    <th >{e._id}</th>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.phonenumber}</td>
                                    <td>{e.address}</td>
                                    <td><h5>{e.status}</h5></td>
                                    <td>{e.orders.length}</td>
                                    <td>{e.totalPrice}</td>
                                    <td> <div class="text-center pt-4">
                                        <button type="button" id="check" class="btn btn-light btn-sm mr-1 mb-2" onClick={() => {
                                            updateStatus(e._id)
                                        }}>Confirm Order</button>
                                    </div> </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>


                </MDBRow>
            </MDBContainer>
        </>

    )
}
