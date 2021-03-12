import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from "./../context/globalContext";
import {
  useHistory
} from "react-router-dom";
// import LogoutButton from "./logoutButton";
import { MDBRow } from 'mdbreact';
import Basket from './Basket';
import './dashboard.css'




function Dashboard() {

  let url = 'http://localhost:5000'
  const globalState = useGlobalState();
  const setGlobalState = useGlobalStateUpdate();
  const [produt, setProducts] = useState([]);

  const [show, ShowHide] = useState(true);


  // let history = useHistory()
  useEffect(() => {
    axios({
      method: 'get',
      url: url + '/getProducts',
      withCredentials: true
    }).then((response) => {

      setProducts(response.data.products)
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  console.log("produt: ", produt)
  function aDD(e, index) {
    console.log('index', index);
    console.log("cart is ", e);

    e.qty = 1;

    setGlobalState((prev) => {

      let cartItems = prev.cart;

      cartItems = [...cartItems, e]

      var found = prev.cart.filter((eachCartItem, i) => eachCartItem._id === e._id);
      var newState;
      if (found.length) {
        newState = { ...prev }
      }
      else {
        newState = { ...prev, cart: cartItems }
      }
      localStorage.setItem("cart", JSON.stringify(newState.cart));
      return newState

    })

  }


  function changeState() {
    ShowHide(Prev => !Prev)
  }


  return (
    <>

      <a className="btn btn-outline-success" onClick={changeState}
        style={{ float: 'right' }} href><i class="fas fa-cart-plus mr-3" /><span>{globalState.cart.length}</span><span className="sr-only">(current)</span></a>
      <MDBRow>

        {show === true ? <main className="container">
          <h1 className="text-center mt-1">Products</h1>
          <div className="row">
            {produt.map((e, index) => (
              <div className="col-md-3 mt-3" key={index}>
                <div style={{ textAlign: 'center' }}>
                  <img className="w-100" height="200" src={e.productimages[0]} alt={e.productname} />
                  <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{e.productname}</h3>
                  <p class="card-text">{e.description}</p>
                  <div>PKR: {e.price}/-Per kg</div>
                  {/* <div> */}
                  <button className="btn btn-primary" onClick={() => { aDD(e) }}>Add To Cart</button>

                  {/* </div> */}
                </div>
              </div>
            ))}
          </div>
        </main> :

          <Basket />}
      </MDBRow>

      {'===>' + JSON.stringify(globalState.cart)}
    </>
  )
}

export default Dashboard;