import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
    createAction,
    JOIN_START
} from "../../redux/actions";

const onJoin = (credentials) => createAction(JOIN_START)(credentials);

import "./Menu.css";

const Join = ({ join }) => {
    const [name, setName] = useState("");

    const handleJoin = (e) => {
        e.preventDefault();
        join({ name });
    };

    return (
        <div className="page join-page">
            <h1>Join</h1>
            <form autoComplete="off" className="join" onSubmit={handleJoin}>
                <input
                    placeholder="name"
                    autoComplete="off"
                    className="join__input login"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus={true} />
                <button className="join__button" onClick={handleJoin}>
                    Join
                </button>
            </form>
        </div>
    );
};

Join.propTypes = {
    join: PropTypes.func.isRequired
};

const mapActionsToProps = (dispatch) => {
    return {
        join: (credentials) => dispatch(onJoin(credentials))
    };
};

export default connect(null, mapActionsToProps)(Join);