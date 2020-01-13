import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import actionCreator from "../../redux/actions/actionCreator";
import * as types from "../../redux/actions/actionTypes";

const onJoin = (e) => actionCreator(types.ROOMS_JOIN_START)(e.target.key);

import "./Menu.css";

const Rooms = ({ rooms, goBack }) => {

    return (
        <div className="page rooms-page">
            <div className="rooms" >
                <button className="rooms__button" disabled>
                    New
                </button>
                {
                    rooms.map(({ id, name }) => <button className="rooms__button" key={id} onClick={onJoin}>{`"${name}"`} room</button>)
                }
                <button className="rooms__button" onClick={goBack}>
                    Back
                </button>
            </div>
        </div>
    );
};

Rooms.propTypes = {
    rooms: PropTypes.array.isRequired,
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