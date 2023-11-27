import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
            nameError: '',
            emailError: '',
            phoneError: '',
        };
    }
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    validateInputs = () => {
        let isValid = true;
        // Validate Name
        if (this.state.name.trim() === '') {
            isValid = false;
            this.setState({ nameError: 'Name cannot be empty.' });
        } else {
            this.setState({ nameError: '' });
        }
        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.state.email.trim() === '') {
            isValid = false;
            this.setState({ emailError: 'Email cannot be empty.' });
        } else if (!emailRegex.test(this.state.email)) {
            isValid = false;
            this.setState({ emailError: 'Email has not correct format.' });
        } else {
            this.setState({ emailError: '' });
        }
        // Validate Phone
        const phoneRegex = /^\d{10}$/; // Assuming 10-digit phone number
        if (this.state.phone.trim() === '') {
            isValid = false;
            this.setState({ phoneError: 'Phone cannot be empty.' });
        } else if (!phoneRegex.test(this.state.phone)) {
            isValid = false;
            this.setState({ phoneError: 'Phone has not correct format.' });
        } else {
            this.setState({ phoneError: '' });
        }
        return isValid;
    };
    handleSubmit = (event) => {
        event.preventDefault();

        if (this.validateInputs()) {
            // Do something with the validated data, e.g., submit the form
            console.log('Form submitted successfully!');
        } else {
            // Form validation failed
            console.log('Form validation failed.');
        }
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                        />
                        <div className="error-message" id="nameErrorLabel">
                            {this.state.nameError && <span>{this.state.nameError}</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                        <div className="error-message" id="emailErrorLabel">
                            {this.state.emailError && <span>{this.state.emailError}</span>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={this.state.phone}
                            onChange={this.handleInputChange}
                        />
                        <div className="error-message" id="phoneErrorLabel">
                            {this.state.phoneError && <span>{this.state.phoneError}</span>}
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
export default Profile;
