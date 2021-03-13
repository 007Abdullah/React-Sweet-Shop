import axios from 'axios';
import { useGlobalStateUpdate } from "../context/globalContext";
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';


function LogoutButton() {
    const history = useHistory();

    let url = 'http://localhost:5000'
    const setGlobalState = useGlobalStateUpdate();

    function logout() {
        axios({
            method: 'post',
            url: url + '/auth/logout',
            withCredentials: true,
        }).then((response) => {
            if (response.data.status === 200) {
                alert(response.data.message)
                // Router.History.back();
                // history.goBack()
                setGlobalState((prev) => ({ ...prev, loginStatus: false, role: "loggedout", user: null, cart: [] }))
            }
        }, (error) => {
            console.log(error.message);
        });

    }
    return (<Button variant="danger" onClick={logout}>Logout</Button>)
}

export default LogoutButton;