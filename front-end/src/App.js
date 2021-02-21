import React, { Component } from "react";
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
  Link
} from "react-router-dom";
import Dashboard from "./components/Dashboard";

import { Navbar, Form, FormControl, Nav, Button } from 'react-bootstrap';
import { useGlobalState } from './context/globalContext'
function App() {
  const globalState = useGlobalState();

  return (
    <>
      <Router>
        <nav>
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href="/"><Link to="/">Home</Link></Nav.Link>
              <Nav.Link href="/Login"><Link to="/login">Login</Link></Nav.Link>
              <Nav.Link href="/Signup"><Link to="/signup">Signup</Link></Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>

        </nav>


        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          {(globalState.loginStatus === false) ?
            <Route path="/">
              <Login />
            </Route> :
            <Route path="/">
              <Dashboard />
            </Route>}

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