import React, { Component } from 'react';
import axios from 'axios';
import './login.css';


class RegisterPage extends Component {



    render() {
        const nameRef = React.createRef();
        const emailRef = React.createRef();
        const passwordRef = React.createRef();

        var registerUser = () => {
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            axios.post("http://localhost:8000/user/register", {
                name,
                email,
                password,
            }).then((response) => {
                console.log(response.data);
                this.props.history.push('/login');
            }).catch((err) => {
                console.log(err);
            })
        }


        return (
            <div>
                <div className="login-div">
                    <div className="logo"></div>
                    <div className="title">Sign Up</div>
                    <div className="sub-title">BETA</div>
                    <div className="fields">
                        <div className="name">
                            <input
                                type="text"
                                className="user-input"
                                placeholder="Name"
                                name="name"
                                required
                                ref={nameRef}
                            />
                        </div>
                        <div className="username">
                            <input
                                type="email"
                                className="user-input"
                                placeholder="username"
                                name="email"
                                required
                                ref={emailRef}
                            />
                        </div>
                        <div className="password">
                            <input
                                type="password"
                                className="pass-input"
                                placeholder="password"
                                name="password"
                                pattern=".{8,12}"
                                required
                                title="8 to 12 characters"
                                ref={passwordRef}
                            />
                        </div>
                    </div>
                    <button onClick={registerUser} className="signin-button">Register</button>

                    <div className="link">
                        <p>Already have an account ?</p>
                        <a href="/login">Login</a>
                    </div>
                </div>
            </div>
        );
    }


}

export default RegisterPage;