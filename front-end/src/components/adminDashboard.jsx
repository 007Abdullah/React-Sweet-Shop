import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow } from 'mdbreact';


let url = 'http://localhost:5000'

function AdminDashboard() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: url + '/getorder',
            withCredentials: true
        }).then((response) => {
            // console.log(response.data.data)
            setData(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    console.log('which come from server', data)


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
    return (
        <>
            <MDBContainer>
                <MDBRow>
                    <h1 style={{ textAlign: 'center' }}>All Products</h1>
                    <div className="d-flex justify-content-between">
                        {data.map((v, i) => {
                            return (
                                <>

                                    <div style={{ width: '19%' }}>
                                        <div class="view zoom overlay z-depth-2 rounded">
                                            <img class="img-fluid w-100"
                                                src={v.productimages[1]} alt="Sample" />

                                            <a href="#!">
                                                <div class="mask">
                                                    <img class="img-fluid w-100" src={v.productimages[0]} alt="#!" />
                                                    <div class="mask rgba-black-slight"></div>
                                                </div>
                                            </a>
                                        </div>

                                        <div class="text-center pt-4">

                                            <h5>{v.name}</h5>
                                            <p class="mb-2 text-muted text-uppercase small">Status :<b>{v.status}</b></p>
                                            <p class="mb-2 text-muted text-uppercase small">Orders :<b>{v.orders}</b></p>

                                            <hr />
                                            <h6 class="mb-3">Total Amount<b>{v.totalPrice}</b></h6>
                                            <button type="button" class="btn btn-light btn-sm mr-1 mb-2"><i
                                                class="fas fa-info-circle pr-2" onClick={() => {
                                                    updateStatus(v._id)
                                                }}></i>confirm Order</button>
                                            <button type="button" class="btn btn-danger btn-sm px-3 mb-2 material-tooltip-main" data-toggle="tooltip"
                                                data-placement="top" title="Add to wishlist"><i class="fas fa-trash-alt"></i></button>
                                        </div>

                                    </div>



                                </>
                            )
                        })}



                    </div>

                </MDBRow>
            </MDBContainer>
        </>
    )




}

export default AdminDashboard;