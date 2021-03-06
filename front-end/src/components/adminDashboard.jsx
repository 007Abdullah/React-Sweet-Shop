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
    return (
        <>
            <MDBContainer>
                <MDBRow>
                    <h1 style={{ textAlign: 'center' }}>All Products</h1>
                    <div style={{ width: '20%', height: '100px' }}>
                        <div class="" >
                            {data.map((v, i) => {
                                return (
                                    <div class="view zoom overlay z-depth-2 rounded">
                                        <img class="img-fluid w-100"
                                            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13a.jpg" alt="Sample" />

                                        <a href="#!">
                                            <div class="mask">
                                                <img class="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg" alt="#!" />
                                                <div class="mask rgba-black-slight"></div>
                                            </div>
                                        </a>
                                    </div>
                                )
                            })}

                        </div>

                        <div class="text-center pt-4">

                            <h5>Fantasy T-shirt</h5>
                            <p class="mb-2 text-muted text-uppercase small">Shirts</p>

                            <hr />
                            <h6 class="mb-3">12.99 $</h6>
                            <button type="button" class="btn btn-light btn-sm mr-1 mb-2"><i
                                class="fas fa-info-circle pr-2"></i>Details</button>
                            <button type="button" class="btn btn-danger btn-sm px-3 mb-2 material-tooltip-main" data-toggle="tooltip"
                                data-placement="top" title="Add to wishlist"><i class="fas fa-trash-alt"></i></button>


                        </div>






                    </div>
                </MDBRow>
            </MDBContainer>
        </>
    )




}

export default AdminDashboard;