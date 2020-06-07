import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import createAction from "../redux/actions/createAction";
import * as types from "../redux/actions/actionTypes";

const onJoin = (credentials) => createAction(types.JOIN_START)(credentials);

import "./Join.css";

const Join = ({ user, join }) => {
    const onJoinClick = () => {
        if (user) {
            join(user);
        } else {
            join();
        }
    };

    return (
        <div className="page join-page">
            <div className="join">
                <button className="join__button" onClick={onJoinClick}>
                    Join
                </button>
            </div>
        </div>
    );
};

Join.propTypes = {
    user: PropTypes.object.isRequired,
    join: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        join: (credentials) => dispatch(onJoin(credentials))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(Join);