import React from "react";
import PropTypes from "prop-types";

import "./PlayersList.css";

const PlayersList = ({ players }) => {
    return (<div className="players">
        <h1>Players</h1>
        <div className="players__list">
            {
                players.map(p => <p key={p.id} className={`player background-color-${p.color}`}>{p.name}</p>)
            }
        </div>
    </div>);
};

PlayersList.propTypes = {
    players: PropTypes.array.isRequired
};

export default PlayersList;