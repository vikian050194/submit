import React from "react";
import PropTypes from "prop-types";

import "./UsersList.css";

const UsersList = ({ user, users, join, leave }) => {
    const renderPlayers = () => users.map(u =>
        <div
            key={u.id}
            className={`user color-bg-${u.id} ${user.id === u.id ? "you" : ""}`}>
            <span>{u.name}</span>
            <span>{u.hp}</span>
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
    users: PropTypes.array.isRequired,
    join: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired
};

export default UsersList;