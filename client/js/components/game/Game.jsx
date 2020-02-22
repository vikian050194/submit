import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import UsersList from "./UsersList";
// import Chat from "./Chat";
// import Arena from "./Arena";

import "./Game.css";

const Game = ({ user, game }) => {
    return (
        <div className="page game-page">
            <UsersList users={[user, ...game.users]} />
            {/* <Arena arena={arena} />
            <Chat /> */}
            {game.capacity}
        </div>
    );
};

Game.propTypes = {
    user: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game
    };
};

// const mapActionsToProps = (dispatch) => {
//     return {
//         login: (userName) => dispatch(login(userName))
//     };
// };

export default connect(mapStateToProps, null)(Game);