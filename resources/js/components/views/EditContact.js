import React, {useState, useEffect}  from "react";
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios";

function EditContact () {
    const [state, setState] = React.useState({
        fullName: "",
        phone: "",
        email: ""
    })


    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setEditData();
    },[])

    // Set edit form data into form
    async function setEditData() {
        const res = await axios.get(`/contact/${params.id}/edit`);
        if(res.data.status === 200) {
            var contact = res.data.contact;

            setState({
                fullName: contact.fullName,
                email: contact.email,
                phone: contact.phone
            });
        }

    }


    async function onUpdateForm(e){
        e.preventDefault();
        const res = await axios.put(`/contact/${params.id}`, state);
        if(res.data.status == 200) {
            navigate("/");
        }
    }

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    return (
        <div className={'card my-3 py-3'}>
            <div className={'col-8 offset-2'}>
                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="fullName">Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter Full Name" id="fullName"
                           name="fullName" value={state.fullName} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="email">Email</label>
                    <input type="text" className="form-control" placeholder="Enter Email Address" id="email"
                           name="email" value={state.email} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label className="col-form-label mt-4" htmlFor="phone">phone</label>
                    <input type="text" className="form-control" placeholder="Enter phone number" id="phone"
                           name="phone" value={state.phone} onChange={handleChange}/>
                </div>

                <button onClick={onUpdateForm} className="mt-5 btn btn-primary">update Contact</button>
            </div>
        </div>
    )
}

export default EditContact;
