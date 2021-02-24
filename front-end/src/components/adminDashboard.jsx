import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from "./../context/globalContext";
import {
    useHistory
} from "react-router-dom";
import data from "./products/productsitem";
import LogoutButton from "./logoutButton";

function AdminDashboard() {

    let url = 'http://localhost:5000'
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();

    let history = useHistory()
    const { products } = data

    const onAdd = (product) => {

    }
 
    return (
        <>
            <LogoutButton />
            <h1>Admin Dashboard</h1>
           

           {/* // form to add product */}

           {/* list down product */}
           
           {'===>' + JSON.stringify(globalState)}

        </>
    )
}

export default AdminDashboard;