import React from "react";

import "./Arena.css";

const Arena = ({ arena }) => {
    const arenaModel = [];

    return (
        <div className="field-container">
            <table className="field">
                {
                    arena.map((r, i) =>
                        <tr key={i}>
                            {r.map((c, j) =>
                                <td className="cell" key={`${i}${j}`}>
                                    <div className="square wall"></div>
                                </td>)}
                        </tr>)
                }
            </table>
        </div>
    );
};

export default Arena;