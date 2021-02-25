import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from "./../context/globalContext";
import {
    useHistory
} from "react-router-dom";
import { Container, Form, Col, Button } from 'react-bootstrap'
import './admin.css';






let url = 'http://localhost:5000'

function AdminDashboard() {

    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();





    return (

        <div>
            <h1>Admin Dashboard</h1>
            <Container fluid="md">
                <div className="row justify-content-md-center">
                    <div className="col-md-6 form">
                        <Form onSubmit="" >
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="name" placeholder="Enter Name" id="productname" required />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" placeholder="Price" id="price" required />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control type="file" placeholder="Image Url" id="imgurl" required />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Active Status</Form.Label>
                                    <Form.Control type="name" placeholder="Active Status" id="activestatus" required />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="text" placeholder="Stock" id="stock" required />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Description</Form.Label>
                                <Form.Control placeholder="Description" id="description" required />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Add
                                </Button>
                        </Form>
                    </div>
                </div>
            </Container>
        </div>








    )
}

export default AdminDashboard;