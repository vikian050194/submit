import React from "react";
import PropTypes from "prop-types";

import "./Arena.css";

const Arena = ({ arena }) => {
    const { size, walls, players } = arena;

    const getCellClass = (x, y) => {
        if (walls.find(([wx, wy]) => wx === x && wy === y)) {
            return "wall";
        }

        const player = players.find(({ x: ux, y: uy }) => ux === x && uy === y);

        if (player) {
            return `color-bg-${player.id-1}`;
        }

        return "empty";
    };

    return (
        <div className="arena">
            <table>
                <tbody>
                    {
                        (() => {
                            const rows = [];

                            for (let y = 0; y < size; y++) {
                                const row = [];

                                for (let x = 0; x < size; x++) {
                                    const classes = ["square", getCellClass(x, y)];

                                    row.push(<td className="cell" key={`${y}${x}`}>
                                        <div className={classes.join(" ")}></div>
                                    </td>);
                                }

                                rows.push(<tr key={y}>{row}</tr>);
                            }

                            return rows;
                        })()
                    }
                </tbody>
            </table>
        </div>
    );
};

Arena.propTypes = {
    arena: PropTypes.object.isRequired
};

export default Arena;