import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import actionCreator from "../../redux/actions/actionCreator";
import * as types from "../../redux/actions/actionTypes";

const onJoin = () => actionCreator(types.JOIN_START)();

import "./Menu.css";

const Rooms = ({ match, rooms, goBack }) => {
    const { id } = match.props;

    return (
        <div className="page rooms-page">
            <div className="rooms" >
                <div>
                    id: {id}
                </div>
                <div>
                    rooms count: {rooms.length}
                </div>
                <button className="rooms__button" onClick={goBack}>
                    Back
                </button>
            </div>
        </div>
    );
};

Rooms.propTypes = {
    rooms: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    joinRoom: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        rooms: state.rooms
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        joinRoom: (id) => dispatch(onJoin(id)),
        goBack: () => dispatch(goBack())
    };
};

export default connect(mapStateToProps, mapActionsToProps)(Rooms);