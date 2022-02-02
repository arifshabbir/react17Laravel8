import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";

class Contact extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * update parent class object
     * @param id
     * @returns {Promise<void>}
     */
    deleteContact = async (id) => {
        const res = await axios.delete(`/contact/${id}`);

        if(res.data.status == 200) {
            this.props.sendData(id);
        }
    }

    render() {

        const {contact} = this.props;
        return (
            <div className='card mb-3'>
                <div className='card-body'>
                    <div className={'col'}>
                        <div className={'row'}>
                            <div className={'col-2'}>{contact.fullName}</div>
                            <div className={'col-3'}>{contact.email}</div>
                            <div className={'col-2'}>{contact.phone}</div>
                            <div className='col'>
                                <Link
                                    className={'btn btn-sm btn-primary float-end offset-1'}
                                    to={`/edit/${contact.id}`}>EDIT</Link>

                                <button
                                    className={'btn btn-sm btn-danger float-end mr-2'}
                                    onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteContact(contact.id)}} >DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Contact;
