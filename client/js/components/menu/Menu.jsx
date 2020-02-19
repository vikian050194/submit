import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    createAction,
    QUIT_START,
    ROOMS_GET_START
} from "../../redux/actions";

const onQuit = () => createAction(QUIT_START)();
const onGetRooms = () => createAction(ROOMS_GET_START)();

import "./Menu.css";

const Menu = ({ quit, gotoRooms }) => {

    return (
        <div className="page menu-page">
            <h1>Menu</h1>
            <div className="menu" >
                <button className="menu__button" onClick={gotoRooms}>
                    Rooms
                </button>
                <button className="menu__button" onClick={quit}>
                    Quit
                </button>
            </div>
        </div>
    );
};

Menu.propTypes = {
    quit: PropTypes.func.isRequired,
    gotoRooms: PropTypes.func.isRequired
};

const mapActionsToProps = (dispatch) => {
    return {
        quit: () => dispatch(onQuit()),
        gotoRooms: () => dispatch(onGetRooms())
    };
};

export default connect(null, mapActionsToProps)(Menu);