import React, {useState} from "react";

function Login() {
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        e.preventDefault();

        setLoginInput({
            ...loginInput,
            [e.target.name]: e.target.value
        })
    }

    function submit (e) {
        e.preventDefault();
        console.log(loginInput);
    }

    return <div className={'card my-3 py-3'}>
        <form className={'col-8 offset-2'} onSubmit={submit}>
            <h2>Login</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email" className="form-label mt-4">Email</label>
                    <input type="email" name="email" className="form-control" id="email" placeholder="email"
                    value={loginInput.value} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label mt-4">Password</label>
                    <input type="password" name="password" className="form-control" id="password" placeholder="password"
                           value={loginInput.value} onChange={handleChange}/>
                </div>
                <div className="my-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </fieldset>
        </form>
    </div>
}

export default Login;
