import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    createAction,
    MESSAGE_SEND
} from "../../redux/actions";

const sendMessage = (message) => createAction(MESSAGE_SEND)(message);

const Chat = ({ messages, sendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
    };

    return (
        <div className="chat">
            <div className="chat__history">
                {messages.map(i => <p key={i.date} className={`foreground-color-${i.user.color}`}>{`${i.user.name}: ${i.message}`}</p>)}
            </div>
            <form autoComplete="off" className="chat__form" onSubmit={handleSubmit}>
                <input
                    value={message}
                    placeholder="Your message is..."
                    autoComplete="off"
                    className="chat__input"
                    onChange={(e) => setMessage(e.target.value)}
                    autoFocus={false} />
                <button className="chat__button">Send</button>
            </form>
        </div>
    );
};

Chat.propTypes = {
    messages: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        sendMessage: (message) => dispatch(sendMessage(message))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(Chat);