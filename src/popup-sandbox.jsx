import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import collection, { TYPE_MODAL, TYPE_POPUP } from 'rrp/popup-collection';

export const popupSelector = state => state.popup;

class Sandbox extends Component {
    render() {
        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName={this.props.modalTransitionName}
                    transitionEnterTimeout={this.props.modalTransitionEnterTimeout}
                    transitionLeaveTimeout={this.props.modalTransitionLeaveTimeout}
                >
                    {this.renderPopups(TYPE_MODAL)}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup
                    transitionName={this.props.popupTransitionName}
                    transitionEnterTimeout={this.props.popupTransitionEnterTimeout}
                    transitionLeaveTimeout={this.props.popupTransitionLeaveTimeout}
                >
                    {this.renderPopups(TYPE_POPUP)}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

    renderPopups(popupType) {
        return collection
            .filter(popup => popup[0] === popupType && this.props[popup[2].id])
            .map(([ type, Popup, props ]) => <Popup key={props.id} {...props} />);
    }
}

Sandbox.propTypes = {
    modalTransitionName: PropTypes.string.isRequired,
    modalTransitionEnterTimeout: PropTypes.number.isRequired,
    modalTransitionLeaveTimeout: PropTypes.number.isRequired,
    popupTransitionName: PropTypes.string.isRequired,
    popupTransitionEnterTimeout: PropTypes.number.isRequired,
    popupTransitionLeaveTimeout: PropTypes.number.isRequired
};

Sandbox.defaultProps = {
    modalTransitionName: 'modal',
    modalTransitionEnterTimeout: 300,
    modalTransitionLeaveTimeout: 300,
    popupTransitionName: 'popup',
    popupTransitionEnterTimeout: 100,
    popupTransitionLeaveTimeout: 100
};

export default connect(popupSelector)(Sandbox);
