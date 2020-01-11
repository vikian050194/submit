import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import actionCreator from "../redux/actions/actionCreator";
import * as types from "../redux/actions/actionTypes";

const onShow = (type) => actionCreator(types.ERROR_DELETE)(type);

const ErrorHandler = ({ errors }) => {
    const count = errors.length;

    useEffect(() => {
        if (errors.length !== 0) {
            console.error(errors);
        }
    }, [count]);

    return null;
};

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        delete: (type) => dispatch(onShow(type))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(ErrorHandler);