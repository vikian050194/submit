import React from "react";
import PropTypes from "prop-types";

import "./UsersList.css";

const UsersList = ({ user, users, join, leave }) => {
    const renderPlayers = () => users.map(u =>
        <p
            key={u.id}
            className={`user color-bg-${u.id}`}>
            <span>{u.name}</span>
            <span>{u.hp}</span>
            <span>{u.score}</span>
        </p>
    );

    const renderButton = () => {
        return user.type === "guest" ?
            <p key="refresh" className={"user join"} onClick={join}>
                join
            </p> :
            <p key="refresh" className={"user join"} onClick={leave}>
                leave
            </p>;
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