import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useGlobalStateUpdate } from './../context/globalContext';
import { MDBRow } from 'mdbreact';
export default function Basket(props) {

    const globalStateUpdate = useGlobalStateUpdate();
    const { cartItem, aDD, remove, removeItem } = props;
    const itemPrice = cartItem.reduce((accumulator, current) => accumulator + current.stock * current.price, 0)
    const totalPrice = itemPrice;
    const history = useHistory();

    function checkout() {
        globalStateUpdate(prev => ({
            ...prev,
            cartData: { cartItem: cartItem, totalPrice: totalPrice }
        }))
        history.push('/Checkout')
    }

    return (
        <MDBRow>
            <div class="row">
                <div class="col-lg-8">
                    <div class="mb-3">
                        <div class="pt-4 wish-list">

                            <h5 class="mb-4">Cart (<span>{cartItem.length}</span> items)</h5>
                            <div class="row mb-4">

                            </div>
                            {cartItem.map((e, index) => {
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
                                                            <p class="mb-3 text-muted text-uppercase small">Stock : {e.stock}</p>
                                                            <p class="mb-2 text-muted text-uppercase small"></p>
                                                            <p class="mb-3 text-muted text-uppercase small"></p>
                                                        </div>
                                                        <div>
                                                            <div class="def-number-input number-input safari_only mb-0 w-100">
                                                                <button onClick={() => remove(e, index)}
                                                                    class="minus decrease">-</button>
                                                                <input class="quantity" min="0" name="quantity" value={e.stock} type="text" style={{ textAlign: 'center' }} />
                                                                <button class="plus increase" onClick={() => aDD(e, index)}>+</button>
                                                            </div>
                                                            <small id="passwordHelpBlock" class="form-text text-muted text-center">
                                                                (Note, 1 piece)
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <a href type="button" class="card-link-secondary small text-uppercase mr-3"><i
                                                                class="fas fa-trash-alt mr-1"></i><span onClick={(e) => removeItem(index)}>Remove item</span> </a>
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
