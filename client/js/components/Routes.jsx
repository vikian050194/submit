import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Join from "./menu/Join.jsx";
import Menu from "./menu/Menu.jsx";
import Rooms from "./menu/Rooms.jsx";
import Game from "./game/Game.jsx";
import PageNotFound from "./404/PageNotFound";

const Routes = ({ user }) => {
    return (
        <Switch>
            <Route exact path="/">
                {
                    user.id ?
                        <Redirect to="/menu" /> :
                        <Redirect to="/join" />
                }
            </Route>
            <Route path="/join" exact component={Join} />
            <Route path="/menu" exact component={Menu} />
            <Route path="/games" exact component={Rooms} />
            <Route path="/games/:id" exact component={Game} />
            <Route component={PageNotFound} />
        </Switch>
    );
};

Routes.propTypes = {
    user: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, null)(Routes);