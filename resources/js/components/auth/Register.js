import React, {useState} from "react";

function Register() {
    const initialState = {
        name: "",
        email: "",
        password: ""
    }
    const [registerInput, setRegister] = React.useState(initialState);


    function handleInput(evt) {
        const value = evt.target.value;
        setRegister({
            ...registerInput,
            [evt.target.name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log('registerInput', registerInput);
    }

    return <div className={'card my-3 py-3'}>
        <form className={'col-8 offset-2'} onSubmit={handleSubmit}>
            <h2>Register</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name" className="form-label mt-4">Full Name</label>
                     <input type="name" className="form-control" id="name" placeholder="name"
                           name='name' value={registerInput.name} onChange={handleInput}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label mt-4">Email ID</label>
                    <input type="email"  className="form-control" id="email" placeholder="email"
                          name="email" onChange={handleInput} value={registerInput.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label mt-4">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="password"
                          name="password" onChange={handleInput} value={registerInput.password}/>
                </div>
                <div className="my-3">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </fieldset>
        </form>
    </div>
}

export default Register;
