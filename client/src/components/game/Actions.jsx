import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Actions.css";

export const Actions = ({ refresh, submit, user }) => {
    const count = 1;
    const [actions, setActions] = useState((new Array(count)).fill(0));
    const options = ["L", "R", "U", "D"];

    const nextAction = (index) => () => {
        const updatedAction = (actions[index] + 1) % options.length;
        setActions([...actions.slice(0, index), updatedAction, ...actions.slice(index + 1, actions.length)]);
    };

    const renderActions = () => actions.map((a, index) => {
        const actionType = "empty";
        const classes = ["square", actionType];

        return <td className="cell action" key={index}>
            <div className={classes.join(" ")} onClick={nextAction(index)}>
                {options[a]}
            </div>
        </td>;
    });

    const renderButtons = () => {
        return <div className="buttons">
            <span className={"button submit"} onClick={() => submit({ id: user.id, actions: [actions[0]] })}>
                submit
            </span>
            <span className={"button refresh"} onClick={refresh}>
                refresh
            </span>
        </div>;
    };

    return (
        <div className="actions">
            <div>
                <table>
                    <tbody>
                        <tr>
                            {renderActions()}
                        </tr>
                    </tbody>
                </table>
            </div>
            {renderButtons()}
        </div>
    );
};

Actions.propTypes = {
    refresh: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};