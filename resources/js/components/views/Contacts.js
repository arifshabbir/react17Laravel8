import React from "react";
import axios from "axios";
import Contact from './Contact';
import {Link} from "react-router-dom";

class Contacts extends React.Component{

    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
    }

    state = {
        contacts: [],
        preloader: false
    }


    fetchContacts = async () => {
        this.setState({preloader: true});

        const res = await axios.get('/contact');
        if (res.data.status == 200) {
            this.setState({
                contacts: res.data.contacts,
                preloader: false
            });
        }


    }

    getData = (id) => {
        const updatedContacts = this.state.contacts.filter((contacts) => contacts.id !== id);
        this.setState({contacts: updatedContacts});
    }

    componentDidMount() {
        this.fetchContacts();
    }

    render() {
        if(this.state.preloader) {
            return (
                <div className="container">
                    <div className={'row mt-4 card'}>

                        <h2 className={'text-center'}>Loading contacts....</h2>
                    </div>
                </div>
            );
        }

        if(this.state.contacts.length) {
            return (
                <div className="container">
                    <h2 className={'text-center mt-3'}>Contacts List</h2>
                    {
                        this.state.contacts.map(contact => (
                            <Contact contact = {contact} sendData={this.getData} key = {contact.id}/>
                        ))
                    }
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className={'row mt-4 card'}>
                        <h2 className={'text-center py-5'}>No Contact Found click <Link to={"/addContact"} className={'link link-info'}>here</Link> to add contact</h2>
                    </div>
                </div>
            );
        }
    }
}

export default Contacts;
