import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/partial/Nav";
import routes from "./routes"
const routeFile = routes();

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
