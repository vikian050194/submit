import React from "react";
import PropTypes from "prop-types";

import "./UsersList.css";

const UsersList = ({ users }) => {
    return (<div className="players">
        <h1>Users</h1>
        <div className="players__list">
            {
                users.map(p =>
                    <p
                        key={p.id}
                        className={`user background-color-${p.id}`}>
                        {p.name}
                    </p>
                )
            }
        </div>
    </div>);
};

UsersList.propTypes = {
    users: PropTypes.array.isRequired
};

export default UsersList;