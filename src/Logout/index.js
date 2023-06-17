import { useNavigate } from 'react-router-dom';
import { db } from "../dbconnect";

function Logout() {

    const nav = useNavigate()
    const formData = new FormData()
    formData.append("mode","LOGOUT")
    fetch(db.session, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    }).then(res => res.text()).then(res => {
        if (res === "LOGGED OUT")
            nav("/")
    })
}

export default Logout;