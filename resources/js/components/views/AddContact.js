import React from "react";
import axios from "axios"

class AddContact extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            email: "",
            phone: ""
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitForm = async (event) => {
        event.preventDefault();

        const res = await axios.post("/contact", this.state);

        if(res.data.status == 200) {
            this.setState({
                fullName: "",
                email: "",
                phone: ""
            })

        }
    }


    render() {
        return (
            <div className={'card my-3 py-3'}>
                <form className={'col-8 offset-2'} onSubmit={this.onSubmitForm}>
                    <div className="form-group">
                        <label className="col-form-label mt-4" htmlFor="fullName">Full Name</label>
                        <input type="text" className="form-control" placeholder="Enter Full Name" id="fullName"
                               name="fullName" value={this.state.fullName} onChange={this.onInputChange}/>
                    </div>

                    <div className="form-group">
                        <label className="col-form-label mt-4" htmlFor="email">Email</label>
                        <input type="text" className="form-control" placeholder="Enter Email Address" id="email"
                               name="email" value={this.state.email} onChange={this.onInputChange}/>
                    </div>

                    <div className="form-group">
                        <label className="col-form-label mt-4" htmlFor="phone">phone</label>
                        <input type="text" className="form-control" placeholder="Enter phone number" id="phone"
                               name="phone" value={this.state.phone} onChange={this.onInputChange}/>
                    </div>

                    <button type={"submit"} className="mt-5 mb-5 btn btn-primary">Save Contact</button>
                </form>
            </div>
        );
    }
}

export default AddContact;
