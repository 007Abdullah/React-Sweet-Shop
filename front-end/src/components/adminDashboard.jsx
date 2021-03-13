import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import moment from 'moment';

let url = 'http://localhost:5000'

function AdminDashboard() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: url + '/getorder',
            withCredentials: true
        }).then((response) => {
            // console.log(response.data.data, '======> what ')
            console.log('why status come in ===>', response.data.data.status)
            setData(response.data.data)

        }).catch((err) => {
            console.log(err)
        })
    }, [])
    // Sir discuss  ----->

    // console.log('which come from server', data)


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
            
        }).catch((err) => {
            console.log(err)
        })

    }

    function delet(id) {
        axios({
            method: 'post',
            url: url + '/Ordercancel',
            data: {
                id: id,
                status: "Order Cancel"
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data.message)
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
                                <th>Date</th>
                                <th>Order Status</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {data.map((eachItem, i) => (
                                <tr key={i}>
                                    <th >{eachItem._id}</th>
                                    <td>{eachItem.name}</td>
                                    <td>{eachItem.email}</td>
                                    <td>{eachItem.phonenumber}</td>
                                    <td>{eachItem.address}</td>
                                    <td><h5>{eachItem.status}</h5></td>

                                    <td>{
                                        eachItem.orders.map((v, i) => {
                                            return (
                                                <>
                                                    {v.cart.map((e) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td >{e.productname}</td>
                                                                    <td >{e.qty} kg</td>

                                                                </tr>

                                                            </>
                                                        )
                                                    })}

                                                </>
                                            )
                                        })
                                    }</td>
                                    <td>{eachItem.totalPrice}</td>
                                    <td>{moment(eachItem.createdOn).format('LLLL')}</td>
                                    <td> <div class="text-center pt-4">
                                        <button type="button" class="btn btn-light btn-sm mr-1 mb-2" id="check" onClick={() => {
                                            updateStatus(eachItem._id)
                                        }}>Confirm Order</button>
                                        <button type="button" class="btn btn-danger btn-sm px-3 mb-2 material-tooltip-main"
                                            data-toggle="tooltip" data-placement="top" title="Add to wishlist" onClick={() => {
                                                delet(eachItem._id)
                                            }}><i class="fas fa-trash-alt"></i></button>


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

export default AdminDashboard;