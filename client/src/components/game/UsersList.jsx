import React from "react";
import PropTypes from "prop-types";

import "./UsersList.css";

const UsersList = ({ user, users }) => {
    return (
        <div className="users">
            <div className="list">
                {
                    users.map(u =>
                        <p
                            key={u.id}
                            className={`user color-bg-${u.id}`}>
                            {u.score}
                        </p>
                    )
                }
            </div>
        </div>
    );
};

UsersList.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
};

export default UsersList;