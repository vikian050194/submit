import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import createAction from "../redux/actions/createAction";
import * as types from "../redux/actions/actionTypes";

const onJoin = () => createAction(types.JOIN_START)();

import "./Join.css";

const Join = ({ join }) => {

    const handleJoin = (e) => {
        e.preventDefault();
        join();
    };

    return (
        <div className="page join-page">
            <form autoComplete="off" className="join" onSubmit={handleJoin}>
                <button className="join__button">
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
        join: () => dispatch(onJoin())
    };
};

export default connect(null, mapActionsToProps)(Join);