import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SignIn from "./menu/SignIn.jsx";
import SignUp from "./menu/SignUp.jsx";
import Menu from "./menu/Menu.jsx";
import Rooms from "./menu/Rooms.jsx";
import Settings from "./menu/Settings.jsx";
import Game from "./game/Game.jsx";
import PageNotFound from "./404/PageNotFound";

const Routes = ({ user }) => {
    return (
        <Switch>
            <Route exact path="/">
                {
                    user.id ?
                        <Redirect to="/menu" /> :
                        <Redirect to="/signin" />
                }
            </Route>
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/menu" exact component={Menu} />
            <Route path="/rooms" exact component={Rooms} />
            <Route path="/rooms/:id" exact component={Game} />
            <Route path="/settings" exact component={Settings} />
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