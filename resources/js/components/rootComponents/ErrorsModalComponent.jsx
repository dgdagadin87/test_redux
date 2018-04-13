import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {cleanErrors} from '../../actions/errors';

const mapStateToProps = state => {
    return {
        errors: state.errorsData.errors
    }
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        cleanErrors: cleanErrors
    }, dispatch);
}

class Errors extends Component {

    _onClickHandler() {

        const {cleanErrors} = this.props;

        cleanErrors(null);
    }

    _renderErrorTemplate(error, index) {

        return (
            <div key={index}>{error}</div>
        );
    }

    render () {

        const {errors = []} = this.props;

        if (errors.length > 0) {
            return (
                <div>
                    {errors.map((error, index) => this._renderErrorTemplate(error, index))}
                    <button onClick={this._onClickHandler.bind(this)}>Закрыть</button>
                </div>
            );
            return errors
        }
        else {
            return null;
        }
    }

}

export default connect(mapStateToProps, matchDispatchToProps)(Errors);