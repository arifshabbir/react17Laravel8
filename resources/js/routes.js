import React from 'react';
import { Route, Routes } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Contacts from "./components/views/Contacts";
import AddContact from "./components/views/AddContact";
import EditContact from "./components/views/EditContact"
import NotFound from "./components/partial/NotFound"

const routes = () => (
    <Routes>
        <Route path="/home" element={ <Contacts /> } />
        <Route path="/edit/:id" exact element={ <EditContact /> } />
        <Route path="/addContact" element={ <AddContact /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="*" element={ <NotFound /> } />
    </Routes>
)

export default routes;
