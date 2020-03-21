import React from "react";
import PropTypes from "prop-types";

import * as resourses from "./resourses";

import "./Icon.css";

export const Icon = ({
    name,
    className = ""
}) => {
    const { width, height, children } = resourses[name];

    return (
        <span>
            <svg className={className} viewBox={[0, 0, width, height].join(" ")}>
                {children}
            </svg>
        </span>
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string
};