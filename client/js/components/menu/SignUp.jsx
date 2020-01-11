import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import actionCreator from "../../redux/actions/actionCreator";
import * as types from "../../redux/actions/actionTypes";

const onSignUp = (credentials) => actionCreator(types.SIGNUP_START)(credentials);

import "./Menu.css";

const SignUp = ({ signUp, goBack }) => {
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp({ name, login, password });
    };

    return (
        <div className="page signup-page">
            <h1>Sign up</h1>
            <form autoComplete="off" className="signup" onSubmit={handleSubmit}>
                <input
                    placeholder="name"
                    autoComplete="off"
                    className="signup__input name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus={true} />
                <input
                    placeholder="login"
                    autoComplete="off"
                    className="signup__input login"
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                    autoFocus={false} />
                <input
                    type="password"
                    placeholder="password"
                    autoComplete="off"
                    className="signup__input password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoFocus={false} />
                <button className="signup__button">Sign up</button>
                <button className="signup__button" onClick={goBack}>
                    Back
                </button>
            </form>
        </div>
    );
};

SignUp.propTypes = {
    signUp: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
};

const mapActionsToProps = (dispatch) => {
    return {
        signUp: (credentials) => dispatch(onSignUp(credentials)),
        goBack: () => dispatch(goBack())
    };
};

export default connect(null, mapActionsToProps)(SignUp);