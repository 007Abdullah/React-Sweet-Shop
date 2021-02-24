import axios from 'axios';
import { useGlobalStateUpdate } from "./../context/globalContext";

function LogoutButton() {

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
                setGlobalState((prev) => ({ ...prev, loginStatus: false, role: null, user: null }))
            }
        }, (error) => {
            console.log(error.message);
        });

    }
    return (<button onClick={logout}>Logout</button>)
}

export default LogoutButton;