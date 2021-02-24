import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from "./../context/globalContext";
import {
    useHistory
} from "react-router-dom";
import LogoutButton from "./logoutButton";
import { Container } from 'react-bootstrap'


function AdminDashboard() {

    let url = 'http://localhost:5000'
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();

    let history = useHistory()



    return (
        <>
            <div>

                <h1>Admin Dashboard</h1>
                {/* // form to add product */}

                <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                    <div className="w-100 text-center mt-2">
                        hdafadfas
                    </div>

                </Container>


                {/* list down product */}
            </div>

            {'===>' + JSON.stringify(globalState)}

        </>
    )
}

export default AdminDashboard;