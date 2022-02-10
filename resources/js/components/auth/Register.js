import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import swal from '@sweetalert/with-react';

function Register() {
    const initialState = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        error_list: []
    }

    const [registerInput, setRegister] = useState(initialState);
    const navigate = useNavigate();

    function handleInput(evt) {
        const value = evt.target.value;
        setRegister({
            ...registerInput,
            [evt.target.name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.confirmPassword
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            register(data);
        })
    }

    async function register(data) {
        const res = await axios.post("/api/register", data);
        if(typeof res.data.status!== undefined && res.data.status === 200) {
            localStorage.setItem('auth_token', res.data.token)
            localStorage.setItem('auth_username', res.data.user)

            swal({
                content: <div>Registered Successfully</div>,
                buttons: false,
                timer: 1000,
            }).then(
                navigate("/login")
            )
        } else {
            setRegister({
                ...registerInput,
                error_list: res.data.error
            })
        }
    }

    return <div className={'card my-3 py-3'}>
        <form className={'col-8 offset-2'} onSubmit={handleSubmit}>
            <h2>Register</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name" className="form-label mt-4">Full Name</label>
                    <input type="name" className="form-control" id="name" placeholder="name"
                           name='name' value={registerInput.name} onChange={handleInput}/>
                    <span className="color-red">{registerInput.error_list.name}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label mt-4">Email ID</label>
                    <input type="email"  className="form-control" id="email" placeholder="email"
                           name="email" onChange={handleInput} value={registerInput.email}/>
                    <span className="color-red">{registerInput.error_list.email}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label mt-4">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="password"
                           name="password" onChange={handleInput} value={registerInput.password}/>
                    <span className="color-red">{registerInput.error_list.password}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword" className="form-label mt-4">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" placeholder="Confirm Password"
                           name="confirmPassword" onChange={handleInput} value={registerInput.ConfirmPassword}/>
                    <span className="color-red">{registerInput.error_list.confirmPassword}</span>
                </div>

                <div className="my-3">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </fieldset>
        </form>
    </div>
}

export default Register;
