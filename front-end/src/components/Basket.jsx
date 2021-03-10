import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useGlobalState, useGlobalStateUpdate } from './../context/globalContext';
import { MDBRow } from 'mdbreact';
export default function Basket(props) {

    const globalState = useGlobalState();
    const globalStateUpdate = useGlobalStateUpdate();

    const history = useHistory();
    const [totalPrice, setTotalPrice] = useState(0);
    console.log(globalState, "global my cart")



    function increment(index) {
        console.log('increment ====>', index)



        globalStateUpdate((prev) => {

            let cart = prev.cart;

            prev.cart[index].qty = prev.cart[index].qty + 1;

            localStorage.setItem("cart", JSON.stringify(cart));

            return { ...prev, cart: cart }



        })
        // const exist = cartItem.find((x) => x._id === e._id);
        // if (exist.stock === 1) {
        //     setCartItem(cartItem.filter((x) => x._id !== e._id));
        // }
        // else {
        //     setCartItem(
        //         cartItem.map((x) =>
        //             x._id === e._id ? { ...exist, stock: exist.stock - 1 } : x
        //         )
        //     )
        // }
    }

    function decrement(index) {
        console.log('decrement index :', index)
        // const exist = cartItem.find((x) => x._id === e._id);
        // if (exist.stock === 1) {
        //     setCartItem(cartItem.filter((x) => x._id !== e._id));
        // }
        // else {
        //     setCartItem(
        //         cartItem.map((x) =>
        //             x._id === e._id ? { ...exist, stock: exist.stock - 1 } : x
        //         )
        //     )
        // }
    }

    function deleteFromCart(index) {
        // let getindex = [...cartItem]
        // getindex.splice(index, 1)
        // setCartItem(getindex)
    }


    function checkout() {
        globalStateUpdate(prev => ({
            ...prev,
            // cartData: { cartItem: cartItem, totalPrice: totalPrice }
        }))
        history.push('/Checkout')
    }

    return (
        <MDBRow>
            <div class="row">
                <div class="col-lg-8">
                    <div class="mb-3">
                        <div class="pt-4 wish-list">

                            <h5 class="mb-4">Cart (<span>{globalState.cart.length}</span> items)</h5>
                            <div class="row mb-4">

                            </div>
                            {globalState.cart.map((e, index) => {
                                return (
                                    <>
                                        <div class="row mb-4">
                                            <div class="col-md-5 col-lg-3 col-xl-3">
                                                <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                                    <img class="img-fluid w-100"
                                                        src={e.productimages[0]} alt="Sample" />
                                                    <a href="">
                                                        <div class="mask">
                                                            <img class="img-fluid w-100"
                                                                src="" alt="Sample" />
                                                            <div class="mask rgba-black-slight"></div>
                                                        </div>
                                                    </a>

                                                </div>
                                            </div>
                                            <div class="col-md-7 col-lg-9 col-xl-9">
                                                <div>
                                                    <div class="d-flex justify-content-between">
                                                        <div>
                                                            <h5>{e.productname}</h5>
                                                            {/* <p class="mb-3 text-muted text-uppercase small">Stock : {e.stock}</p> */}
                                                            <p class="mb-2 text-muted text-uppercase small"></p>
                                                            <p class="mb-3 text-muted text-uppercase small"></p>
                                                        </div>
                                                        <div>
                                                            <div class="def-number-input number-input safari_only mb-0 w-100">
                                                                <button onClick={() => decrement(index)}
                                                                    class="minus decrease">-</button>
                                                                <input class="quantity" min="0" name="quantity" value={e.qty} type="text" style={{ textAlign: 'center' }} id="increment" />
                                                                <button class="plus increase" onClick={() => increment(index)}>+</button>
                                                            </div>
                                                            <small id="passwordHelpBlock" class="form-text text-muted text-center">
                                                                (Note, 1 piece)
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <a href type="button" class="card-link-secondary small text-uppercase mr-3"><i
                                                                class="fas fa-trash-alt mr-1"></i><span onClick={(e) => deleteFromCart(index)}>Remove item</span> </a>
                                                        </div>
                                                        <p class="mb-0"><span><strong id="summary">{e.price}</strong></span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )
                            })}

                            <hr class="mb-4" />

                        </div>
                    </div>
                </div>

                <div class="col-lg-4">

                    <div class="mb-3">
                        <div class="pt-4">

                            <h5 class="mb-3">The total amount of</h5>

                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Temporary amount
                                <span>$25.98</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                <span>Gratis</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>The total amount of</strong>
                                        <strong>
                                            <p class="mb-0">(including VAT)</p>
                                        </strong>
                                    </div>
                                    <span><strong>{totalPrice}</strong></span>
                                </li>
                            </ul>

                            <button type="button" class="btn btn-primary btn-block" onClick={checkout}>GO TO Checkout</button>

                        </div>
                    </div>



                </div>

            </div>



        </MDBRow>
    )
}
