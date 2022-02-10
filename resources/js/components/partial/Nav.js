import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import swal from "@sweetalert/with-react";
const Nav = ()=> {

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('auth_username')

                swal({
                    content: <div>Logged out successfully</div>,
                    buttons: false,
                    timer: 1000,
                })
            }
        })

    }

    var AuthButtons = "";

    if(!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <li className="nav-item">
                <Link className="nav-link float-end" to="/Register">Register</Link>
                <Link className="nav-link float-end" to="/Login">Login</Link>
            </li>
        );
    }else {
        AuthButtons = (
            <li className="nav-item">
                <Link className="nav-link float-end btn btn-danger btn-sm text-white"
                      onClick={logoutSubmit}
                      to="/logout">logout</Link>
            </li>
        );

    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/home">Home
                                <span className="visually-hidden">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addContact">addContact</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <ul className="navbar-nav me-auto">
                            {AuthButtons}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}


export default Nav;
