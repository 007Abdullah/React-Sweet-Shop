import React from "react";
// import {
//   MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon
// } from "mdbreact";
import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import LogoutButton from './components/LogoutButton';
import { Navbar, Form, FormControl, Nav, Button } from 'react-bootstrap';
import { useGlobalState } from './context/globalContext'
import AddProduct from './components/AddProduct';
import Checkout from './components/Checkout';
import Basket from './components/Basket';
import Myorders from './components/Myorders';
function App() {
  const globalState = useGlobalState();

  return (
    <>
      <Router>
        <nav>
          <Navbar bg="dark" variant="dark">
            {(globalState.loginStatus === true) ?
              <>
                {(globalState.role === 'admin') ?
                  <>
                    <Nav className="mr-auto">
                      <Nav.Link><Link to="/">Admin Dashboard</Link></Nav.Link>

                      <Nav.Link><Link to="/addproducts">Add Product</Link></Nav.Link>
                    </Nav>
                    <LogoutButton />


                  </> :
                  <>
                    <Nav className="mr-auto">
                      <Nav.Link><Link to="/">User Dashboard</Link></Nav.Link>

                      <Nav.Link><Link to="/basket">ghfdghfh</Link></Nav.Link>
                    </Nav>

                    <LogoutButton />




                  </>}

              </> :
              <>

                <Nav className="mr-auto">
                  <Nav.Link href="/"><Link to="/">Home</Link></Nav.Link>
                  <Nav.Link href="/login"><Link to="/login">Login</Link></Nav.Link>
                  <Nav.Link href="/signup"><Link to="/signup">Signup</Link></Nav.Link>
                </Nav>


              </>

            }






            {/* {(globalState.role === 'user') ?
              <>
                <Nav className="mr-auto">
                  <Nav.Link href="/"><Link to="/">User Dashboard</Link></Nav.Link>

                  <Nav.Link href="/"><Link to="/addproducts">My Orders</Link></Nav.Link>
                 
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-info">Search</Button>
                  <LogoutButton />
                </Form> */}


            {/* </> :
              <>
                <Nav className="mr-auto">
                  <Nav.Link href="/"><Link to="/">Admin Dashboard</Link></Nav.Link>

                  <Nav.Link href="/"><Link to="/">Add Product</Link></Nav.Link>
                  {/* <Nav.Link href="/"><Link to="/"><LogoutButton /></Link></Nav.Link> */}
            {/* </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-info">Search</Button>
                  <LogoutButton />
                </Form> */}




            {/* </>} */}








            {/* {(globalState.loginStatus === true) ?
              <> */}
            {/* <Nav className="mr-auto">
                  <Nav.Link href="/"><Link to="/">Dashboard</Link></Nav.Link>

                  <Nav.Link href="/"><Link to="/profile">profile</Link></Nav.Link>

                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-info">Search</Button>
                  <LogoutButton />
                </Form> */}
            {/* <a className="text-success btn btn-outline-success mr-3">Logout<span className="sr-only">(current)</span></a>
                <a className="btn btn-outline-success " ><i class="fas fa-cart-plus mr-3" /><span>{ }</span><span className="sr-only">(current)</span></a>
              </>
              :
              <>
                <Nav className="mr-auto">
                  <Nav.Link href="/"><Link to="/">Home</Link></Nav.Link>
                  <Nav.Link href="/login"><Link to="/login">Login</Link></Nav.Link>
                  <Nav.Link href="/signup"><Link to="/signup">Signup</Link></Nav.Link>
                </Nav>
              </>
            } */}


          </Navbar>

        </nav>


        <Switch>
          {(globalState.role === null) ?
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>

              <Route path="/login">
                <Login />
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </>
            : null}

          {(globalState.role === "user") ?
            <>
              <Route exact path="/">
                <Dashboard />
              </Route>

              <Route path="/home">
                <Home />
              </Route>

              <Route path="/basket">
                <Basket />
              </Route>

              <Route path="/checkout">
                <Checkout />
              </Route>

              <Route path="/myorders">
                <Myorders />
              </Route>



              <Route path="*">
                <Redirect to="/" />
              </Route>

            </>
            : null}

          {(globalState.role === "admin") ?
            <>
              <Route exact path="/">
                <AdminDashboard />
              </Route>
              <Route path="/logout">
                <LogoutButton />
              </Route>

              <Route path="/addproducts">
                <AddProduct />
              </Route>

              <Route path="*">
                <Redirect to="/" />
              </Route>
            </>
            : null}




        </Switch>
      </Router>

    </>
  )


}

export default App;
// class App extends Component {

//   state = {
//     isOpen: false
//   };

//   toggleCollapse = () => {
//     this.setState({ isOpen: !this.state.isOpen });
//   }

//   render() {
//     return (
//       <>
//         <Router>
//           <MDBNavbar color="default-color" dark expand="md">
//             <MDBNavbarBrand>
//               <strong className="white-text">Navbar</strong>
//             </MDBNavbarBrand>
//             <MDBNavbarToggler onClick={this.toggleCollapse} />
//             <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
//               <MDBNavbarNav left>
//                 <MDBNavItem active>
//                   <MDBNavLink to="/">Home</MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="#!">Features</MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="#!">Pricing</MDBNavLink>
//                 </MDBNavItem>
//               </MDBNavbarNav>
//               <MDBNavbarNav right>
//                 <MDBNavItem>
//                   <MDBNavLink className="waves-effect waves-light" to="#!">
//                     <MDBIcon fab icon="twitter" />
//                   </MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink className="waves-effect waves-light" to="#!">
//                     <MDBIcon fab icon="google-plus-g" />
//                   </MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="/login">Login</MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="/signup">Signup</MDBNavLink>
//                 </MDBNavItem>
//               </MDBNavbarNav>
//             </MDBCollapse>
//           </MDBNavbar>

//           <Switch>
//             {(globalState.loginStatus === false) ?
//               <Route path="/">
//                 <Login />
//               </Route> :
//               <Route path="/">
//                 <Dashboard />
//               </Route>

//             }
//             <Route exact path="/home">
//               <Home />
//             </Route>
//             <Route path="/signup">
//               <Signup />
//             </Route>
//           </Switch>

//         </Router>
//       </>
//     );
//   }
// }