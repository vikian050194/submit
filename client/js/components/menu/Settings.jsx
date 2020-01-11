import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push, goBack } from "connected-react-router";
import actionCreator from "../../redux/actions/actionCreator";
import * as types from "../../redux/actions/actionTypes";

const onJoin = () => actionCreator(types.JOIN_START)();

import "./Menu.css";

const Settings = ({ goBack }) => {
    return (
        <div className="page settings-page">
            <div className="settings" >
                <div>
                    settings
                </div>
                <button className="menu__button" onClick={goBack}>
                    Back
                </button>
            </div>
        </div>
    );
};

Settings.propTypes = {
    goBack: PropTypes.func.isRequired
};

const mapActionsToProps = (dispatch) => {
    return {
        goBack: () => dispatch(goBack())
    };
};

export default connect(null, mapActionsToProps)(Settings);