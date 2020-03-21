import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import createAction from "../../redux/actions/createAction";
import * as types from "../../redux/actions/actionTypes";

const onGetState = () => createAction(types.GET_STATE_START)();

// import UsersList from "./UsersList";
import Arena from "./Arena";

import "./Game.css";

const Space = () => {
    return (
        <div className="space"></div>
    );
};

const Actions = () => {
    const count = 10;
    const actions = (new Array(count)).fill(0);
    const options = ["L", "R", "U", "D", "B"];

    return (
        <div className="actions">
            <table>
                <tbody>
                    <tr>
                        {
                            actions.map((a, index) => {
                                const actionType = index < 3 ? "wall" : index < 6 ? "block" : "empty";
                                const classes = ["square", actionType];

                                return <td className="cell" key={index}>
                                    <div className={classes.join(" ")}>
                                        {options[index % 4]}
                                    </div>
                                </td>;
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </div>
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

const Game = ({ user, game, getState }) => {
    useEffect(() => {
        getState();
    }, []);

    return (
        <div className="page game-page">
            <Actions />
            <Space />
            <Arena arena={game} />
            {/* <UsersList user={user} users={game.users} /> */}
            <Space />
            {/* <Info value={"Some info should be here"}/> */}
        </div>
    );
};

Game.propTypes = {
    user: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired
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