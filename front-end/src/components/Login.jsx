import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './login.css'
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from './../context/globalContext'
import { useHistory } from 'react-router-dom';



const url = 'http://localhost:5000'
function Login() {
    let [show, setShow] = useState()
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    const history = useHistory();


    function hanldlogin(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + '/auth/login',
            data: {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }, withCredentials: true
        }).then((response) => {
            console.log("response.data: ", response.data);
            if (response.data.status === 200) {
                // alert(response.data.message)
                // history.push('/AdminDashboard')
                setGlobalState(prev => {
                    return { ...prev, user: response.data.user, role: response.data.user.role }
                })

            } else {
                // alert(response.data.message);
                setShow(response.data.message)
            }
        }).catch((error) => {
            console.log(error);
        });

    }
    return (
        <div className="center">
            <MDBContainer>
                <MDBRow className="rowcenter">
                    <MDBCol md="6">
                        <form onSubmit={hanldlogin} className="formcenter">
                            <p className="h4 text-center mb-4">Sign in</p>
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                Your email
                            </label>
                            <input type="email" id="email" className="form-control" placeholder="Enter Your Email" />
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                Your password
                            </label>
                            <input type="password" id="password" className="form-control" placeholder="Enter Your Password" />
                            <div className="text-center mt-4">
                                <MDBBtn color="unique" type="submit">Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            {show ? <div className="alert alert-danger" role="alert">
                {show}
            </div> : null}

            {'===>' + JSON.stringify(globalState)}
        </div>
    )
}

export default Login;


