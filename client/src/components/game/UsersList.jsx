import React from "react";
import PropTypes from "prop-types";

import "./UsersList.css";

const UsersList = ({ user, players, join, leave }) => {
    const renderPlayers = () => players.map(u =>
        <div
            key={u.id}
            className={`user color-bg-${u.id-1} ${user.id === u.id ? "you" : ""}`}>
            <span>{u.name}</span>
            <span>{u.health}</span>
            <span>{u.score}</span>
        </div>
    );

    const renderButton = () => {
        return user.type === "guest" ?
            <div key="refresh" className={"user join"} onClick={join}>
                join
            </div> :
            <div key="refresh" className={"user join"} onClick={leave}>
                leave
            </div>;
    };

    return (
        <div className="users">
            <div className="list">
                {
                    [...renderPlayers(), renderButton()]
                }
            </div>
        </div>
    );
};

UsersList.propTypes = {
    user: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    join: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired
};

export default UsersList;