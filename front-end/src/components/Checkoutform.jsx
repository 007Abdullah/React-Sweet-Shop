import React, { useRef } from 'react'
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import axios from 'axios';
import { useGlobalState } from './../context/globalContext';
import url from './BaseUrl'
// const url = 'http://localhost:5000';
function Checkout() {
    const globalState = useGlobalState();

    console.log(globalState.cart.totalPrice, "total price merii jan")
    // globalState.cart.map((value) => {
    //     return <>
    //         delete value.description
    //         delete value.stock
    //     </>
    // })

    const uname = useRef();
    const number = useRef();
    const address = useRef();



    function hanldCheck(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + '/order',
            data: {
                name: uname.current.value,
                phonenumber: number.current.value,
                address: address.current.value,
                orders: globalState.cart,
                totalPrice: globalState.cart.totalPrice
            }, withCredentials: true
        }).then((response) => {

            alert(response.data.message);

        }).catch((error) => {
            console.log(error);
        });

    }
    return (
        <MDBRow>
            <MDBCol md="6">
                <form className="formcenter" onSubmit={hanldCheck}>
                    <p className="h4 text-center mb-4">Check Out Form</p>
                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                        Your name
                 </label>
                    <input type="text" className="form-control" required ref={uname} placeholder="Your Name" />
                    <br />
                    <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                        Phone Number
                    </label>
                    <input type="text" className="form-control" required ref={number} placeholder="Phone Number" />
                    <br />
                    <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                        Address
                    </label>
                    <input type="text" className="form-control" required ref={address} placeholder="Address" />


                    <div className="text-center mt-4">
                        <MDBBtn color="unique" type="submit">
                            Confirm Order
                        </MDBBtn>
                    </div>
                </form>
            </MDBCol>
        </MDBRow>
    )
}

export default Checkout;