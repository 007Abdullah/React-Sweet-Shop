import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import { useGlobalState, useGlobalStateUpdate } from "./../context/globalContext";
import {
    useHistory
} from "react-router-dom";
import { Container, Form, Col, Button, Row } from 'react-bootstrap'
import './admin.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Col, Form, Container, Row } from "react-bootstrap";





let url = 'http://localhost:5000'

function AdminDashboard() {
    const [data, setData] = useState([]);
    const globalState = useGlobalState();
    // const setGlobalState = useGlobalStateUpdate();
    const productname = useRef();
    const price = useRef();
    const productimg = useRef();
    const activeStatus = useRef();
    const stock = useRef();
    const description = useRef();







    function handlsubmit(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + '/admindashboard',
            data: {
                productname: productname.current.value,
                price: price.current.value,
                productimage: productimg.current.value,
                activeStatus: activeStatus.current.value,
                stock: stock.current.value,
                description: description.current.value
            }, withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                alert(response.data.message)
                setData((previous) => {
                    return previous.concat([response.data.data]);
                });
                // console.log("ya data check karna han kaha sa a rha han", response.data.data)
            } else {
                alert(response.data.message);
            }
        }).catch((error) => {
            console.log(error);
        });

        console.log(data)
    }







    return (

        <div className="logincenter">
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <form >
                            <p className="h4 text-center mb-4">Product Add</p>
                            <label htmlFor="defaultFormLoginEmailEx" className="black-text">
                                Product Name
                            </label>
                            <input type="text" ref={productname} className="form-control" placeholder="Product Name" />

                            <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                                Product Price
                            </label>
                            <input type="number" className="form-control" ref={price} placeholder="Product Price" />
                            <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                                Product Stock
                            </label>
                            <input type="text" className="form-control" ref={stock} placeholder="Product Stock" />
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                                ActiveStatus
                            </label>
                            <select style={{ float: 'right' }} ref={activeStatus}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                                Product Images
                            </label>
                            <input type="file" className="form-control" />
                            <input type="file" className="form-control" />
                            <input type="file" className="form-control" />
                            <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                                Product Description
                            </label>
                            <input type="text" className="form-control" ref={description} placeholder="Product Description" />

                            <div className="text-center mt-4">
                                <MDBBtn color="indigo" type="submit">Add</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>



            {'===>' + JSON.stringify(globalState)}
        </div>

        // <div>
        //     <h1>Product Add</h1>
        //     <Container fluid="md">
        //         <Row className="justify-content-md-center">
        //             <Form onSubmit="" className="justify-content-md-center">
        //                 <Form.Row>
        //                     <Form.Group as={Col} controlId="formGridEmail">
        //                         <Form.Label>Product Name</Form.Label>
        //                         <Form.Control type="name" placeholder="Product Name" required />
        //                     </Form.Group>

        //                     <Form.Group as={Col} controlId="formGridPassword">
        //                         <Form.Label>Price</Form.Label>
        //                         <Form.Control type="text" placeholder="Price" required />
        //                     </Form.Group>
        //                 </Form.Row>

        //                 <Form.Group controlId="formGridAddress1">
        //                     <Form.Label>Choose Product Image</Form.Label>
        //                     <Form.Control type="url" placeholder="Product URL" required />
        //                 </Form.Group>

        //                 <Form.Group controlId="formGridAddress2">
        //                     <Form.Label>Description</Form.Label>
        //                     <Form.Control type="text" placeholder="Description" required />
        //                 </Form.Group>

        //                 <Form.Row>
        //                     <Form.Group as={Col} controlId="formGridPassword">
        //                         <Form.Label>Quantity</Form.Label>
        //                         <Form.Control type="text" placeholder="Quantity" required />
        //                     </Form.Group>

        //                     <Form.Group as={Col} controlId="formGridEmail">
        //                         <Form.Label>Active Status</Form.Label>
        //                         <Form.Control type="name" placeholder="Active Status" required />
        //                     </Form.Group>
        //                 </Form.Row>

        //                 <Button variant="primary" type="submit">Submit</Button>
        //             </Form>
        //         </Row>
        //     </Container>

        // </div>



        // <div>
        //     <h1>Admin Dashboard</h1>
        //     <Container fluid="md">
        //         <Row className="justify-content-md-center">
        //             <Form onSubmit={handlsubmit} >
        //                 <Form.Row>
        //                     <Form.Group as={Col}>
        //                         <Form.Label>Product Name</Form.Label>
        //                         <Form.Control type="name" placeholder="Enter Name" ref={productname} required />
        //                     </Form.Group>

        //                     <Form.Group as={Col}>
        //                         <Form.Label>Price</Form.Label>
        //                         <Form.Control type="text" placeholder="Price" ref={price} required />
        //                     </Form.Group>
        //                 </Form.Row>

        //                 <Form.Group controlId="formGridAddress1">
        //                     <Form.Label>Product Image</Form.Label>
        //                     <Form.Control type="url" placeholder="Image Url" ref={productimg} required />
        //                 </Form.Group>

        //                 <Form.Row>
        //                     <Form.Group as={Col}>
        //                         <Form.Label>Active Status</Form.Label>
        //                         <Form.Control type="name" placeholder="Active Status" ref={activeStatus} required />
        //                     </Form.Group>

        //                     <Form.Group as={Col}>
        //                         <Form.Label>Stock</Form.Label>
        //                         <Form.Control type="text" placeholder="Stock" ref={stock} required />
        //                     </Form.Group>
        //                 </Form.Row>

        //                 <Form.Group controlId="formGridAddress2">
        //                     <Form.Label>Description</Form.Label>
        //                     <Form.Control placeholder="Description" ref={description} required />
        //                 </Form.Group>

        //                 <Button variant="primary" type="submit">
        //                     Add
        //                     </Button>
        //             </Form>

        //         </Row>
        //     </Container>

        //     {data.map((eachItem, i) => {
        //         return (
        //             <div key={eachItem.id} className="container">
        //                 <div className="row">
        //                     <div className="box">
        //                         <div>
        //                             <img src={eachItem.productimage} alt={eachItem.name} className="productimg" />
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>)
        //     })}

        //     <div className="container-lg border border-primary">
        //         <div className="row d-flex justify-content-end ">
        //             <div className="col-3 border border-dark" >
        //                 <h1>asdfahshfjas</h1>
        //             </div>
        //             <div className="col-3 border border-dark" >
        //                 <h1>asdfahshfjas</h1>
        //             </div>
        //             <div className="col-3 border border-dark" >
        //                 <h1>asdfahshfjas</h1>
        //             </div>
        //             <div className="col-3 border border-dark" >
        //                 <h1>asdfahshfjas</h1>
        //             </div>
        //             <div className="col-3 border border-dark" >
        //                 <h1>asdfahshfjas</h1>
        //             </div>
        //         </div>
        //     </div >

        // </div >



    )
}

export default AdminDashboard;