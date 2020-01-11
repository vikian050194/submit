import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import actionCreator from "../../redux/actions/actionCreator";
import * as types from "../../redux/actions/actionTypes";

const onSignIn = (credentials) => actionCreator(types.SIGNIN_START)(credentials);

import "./Menu.css";

const SignIn = ({ signIn, signUp }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        signUp();
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        signIn({ login, password });
    };

    return (
        <div className="page signin-page">
            <h1>Sign in</h1>
            <form autoComplete="off" className="signin" onSubmit={handleSignIn}>
                <input
                    placeholder="login"
                    autoComplete="off"
                    className="signin__input login"
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                    autoFocus={true} />
                <input
                    type="password"
                    placeholder="password"
                    autoComplete="off"
                    className="signin__input password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoFocus={false} />
                <button className="signin__button" onClick={handleSignIn}>
                    Sign in
                </button>
                <button className="signin__button" onClick={handleSignUp}>
                    Sign up
                </button>
            </form>
        </div>
    );
};

SignIn.propTypes = {
    signIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired
};

const mapActionsToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(onSignIn(credentials)),
        signUp: () => dispatch(push("/signup"))
    };
};

export default connect(null, mapActionsToProps)(SignIn);