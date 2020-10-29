import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import createAction from "../../redux/actions/createAction";
import * as types from "../../redux/actions/actionTypes";

const onGetState = () => createAction(types.GET_STATE_START)();
const onSubmit = (data) => createAction(types.SUBMIT_START)(data);
const onJoin = (credentials) => createAction(types.JOIN_START)(credentials);
const onLeave = (credentials) => createAction(types.LEAVE_START)(credentials);

import { Actions } from "./Actions";
import UsersList from "./UsersList";
import Arena from "./Arena";

import "./Game.css";

const Space = () => {
    return (
        <div className="space"></div>
    );
};

const Info = ({ value }) => {
    return (
        <div className="info">
            {value}
        </div>
    );
};

Info.propTypes = {
    value: PropTypes.string.isRequired
};

const Game = ({ user, game, getState, join, leave, submit }) => {
    useEffect(() => {
        getState();
    }, []);

    return (
        <div className="page game-page">
            <Actions refresh={getState} submit={submit} user={user}/>
            <Space />
            <div className="middle">
                <Arena arena={game} />
                <UsersList user={user} players={game.players} join={() => join({ id: user.id })} leave={() => leave({ id: user.id })} />
            </div>
            <Space />
            <Info value={"Some info should be here"} />
        </div>
    );
};

Game.propTypes = {
    user: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    getState: PropTypes.func.isRequired,
    join: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        game: state.game,
        user: state.user
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        getState: () => dispatch(onGetState()),
        join: (credentials) => dispatch(onJoin(credentials)),
        leave: (credentials) => dispatch(onLeave(credentials)),
        submit: data => dispatch(onSubmit(data))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(Game);