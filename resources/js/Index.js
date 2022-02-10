import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/partial/Nav";
import routes from "./routes"
const routeFile = routes();
import axios from "axios";

axios.defaults.baseURL = '/'
axios.defaults.headers.post['Content-Type'] = "application/json"
axios.defaults.headers.post['Accept'] = "application/json"
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return  config;
})

function Index() {
    return (
        <Router>
            <div className="container">
                <div className="row">
                    <Nav />
                    {routeFile}
                </div>
            </div>
        </Router>
    );
}

export default Index;

if (document.getElementById('dom-container')) {
    ReactDOM.render(<Index />, document.getElementById('dom-container'));
}
