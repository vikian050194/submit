import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// import PlayersList from "./PlayersList";
// import Chat from "./Chat";
// import Arena from "./Arena";

import "./Game.css";

const Game = ({ match }) => {
    const { id } = match.params;

    return (
        <div className="page game-page">
            {/* <Arena arena={arena} />
            <PlayersList players={[user, ...users]} />
            <Chat /> */}
            {id}
        </div>
    );
};

Game.propTypes = {
    // user: PropTypes.object.isRequired,
    // users: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        users: state.users,
        arena: state.arena
    };
};

// const mapActionsToProps = (dispatch) => {
//     return {
//         login: (userName) => dispatch(login(userName))
//     };
// };

export default connect(mapStateToProps, null)(Game);