import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
    createAction,
    SIGNOUT_START,
    ROOMS_GET_START
} from "../../redux/actions";

const onSignOut = () => createAction(SIGNOUT_START)();
const onGetRooms = () => createAction(ROOMS_GET_START)();

import "./Menu.css";

const Menu = ({ signOut, gotoRooms, gotoSettings }) => {

    return (
        <div className="page menu-page">
            <h1>Menu</h1>
            <div className="menu" >
                <button className="menu__button" onClick={gotoRooms}>
                    Rooms
                </button>
                <button className="menu__button" onClick={gotoSettings} disabled>
                    Settings
                </button>
                <button className="menu__button" onClick={signOut}>
                    Sign out
                </button>
            </div>
        </div>
    );
};

Menu.propTypes = {
    signOut: PropTypes.func.isRequired,
    gotoSettings: PropTypes.func.isRequired,
    gotoRooms: PropTypes.func.isRequired
};

const mapActionsToProps = (dispatch) => {
    return {
        signOut: () => dispatch(onSignOut()),
        gotoSettings: () => dispatch(push("/settings")),
        gotoRooms: () => dispatch(onGetRooms())
    };
};

export default connect(null, mapActionsToProps)(Menu);