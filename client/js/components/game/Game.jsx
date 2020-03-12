import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import createAction from "../../redux/actions/createAction";
import * as types from "../../redux/actions/actionTypes";

const onGetState = () => createAction(types.GET_STATE_START)();

import UsersList from "./UsersList";
import Arena from "./Arena";

import "./Game.css";

const Game = ({ user, game, getState }) => {
    useEffect(() => {
        getState();
    }, []);

    return (
        <div className="page game-page">
            <Arena arena={game} />
            <UsersList user={user} users={game.users} />
        </div>
    );
};

Game.propTypes = {
    user: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    getState: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        game: state.game,
        user: state.user
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        getState: () => dispatch(onGetState())
    };
};

export default connect(mapStateToProps, mapActionsToProps)(Game);