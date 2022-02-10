import React, {useState} from "react";
import axios from "axios";
import swal from '@sweetalert/with-react';
import {useNavigate} from "react-router-dom";


function Login() {
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: "",
        error_list: []
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();

        setLoginInput({
            ...loginInput,
            [e.target.name]: e.target.value
        })
    }

    function submit (e) {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            login(data);
        })
    }

    async function login(data) {
        const res = await axios.post("/api/login", data);
        console.log('res.data.message', res.data)
        if (typeof res.data!== undefined && res.data.status === 200) {
            localStorage.setItem('auth_token', res.data.token)
            localStorage.setItem('auth_username', res.data.user)

            swal({
                content: <div>Logged in successfully</div>,
                buttons: false,
                timer: 1000,
            })

        } else if (typeof res.data !== undefined && res.data.status === 401) {
            swal({
                content: res.data.message,
                buttons: false,
                timer: 1000,
            }).then(
                navigate("/")
            )
        } else {
            console.log('1')
            setLoginInput({
                ...loginInput,
                error_list: res.data.error
            })
        }
    }

    return <div className={'card my-3 py-3'}>
        <form className={'col-8 offset-2'} onSubmit={submit}>
            <h2>Login</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email" className="form-label mt-4">Email</label>
                    <input type="email" name="email" className="form-control" id="email" placeholder="email"
                           value={loginInput.value} onChange={handleChange}/>
                    <span className="color-red">{loginInput.error_list.email}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label mt-4">Password</label>
                    <input type="password" name="password" className="form-control" id="password" placeholder="password"
                           value={loginInput.value} onChange={handleChange}/>
                    <span className="color-red">{loginInput.error_list.password}</span>
                </div>
                <div className="my-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </fieldset>
        </form>
    </div>
}

export default Login;
