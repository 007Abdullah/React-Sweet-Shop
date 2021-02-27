import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from "./../context/globalContext";
import {
    useHistory
} from "react-router-dom";
import LogoutButton from "./logoutButton";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

function Dashboard() {

    let url = 'http://localhost:5000'
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    const [produt, setProducts] = useState([]);
    let history = useHistory()
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/getProducts',
            withCredentials: true
        }).then((response) => {
            // console.log(response.data.data)
            setProducts(response.data.products)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    console.log(produt)
    return (
        <>
            {/* <LogoutButton />            */}
            {/* <h1>Dashboard</h1>
            <div>

                {globalState.user ?
                    <>
                        <div>
                            <h2>{globalState.user.name}</h2>
                        </div>

                    </>
                    : null}
            </div>
 */}

            {/* {'===>' + JSON.stringify(globalState)} */}



            <MDBRow>
                <main className="container">
                    <h1 className="text-center mt-1 ">Products</h1>
                    <div className="row">
                        {produt.map((e) => (
                            <div className="col-md-3 mt-3" key={e.id}>
                                <div>
                                    <img className="w-100" height="200" src={e.productimages[0]} alt={e.productname} />
                                    <h3>{e.productname}</h3>
                                    <p class="card-text">{e.description}</p>
                                    <div>PKR: {e.price}/- Per kg</div>
                                    <div>
                                        <button className="btn btn-primary">Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* {produt.map((e) => {
                    return (
                        <>
                            <div>

                                <h1>adfasjkfhajfhd</h1>
                            </div>

                        </>


                    )
                })
                } */}
                <br />



            </MDBRow>




        </>
    )
}

export default Dashboard;