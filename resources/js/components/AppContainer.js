import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {loadApplication} from '../actions/application';

const mapStateToProps = state => {
    return {
        isLoaded: state.commonData.isLoaded,
        appData: state.commonData.data
    }
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        loadApplication: loadApplication
    }, dispatch);
}

class AppContainer extends Component {

    componentDidMount() {

        const {loadApplication} = this.props;

        const appLoadedData = {
            isLoaded: true,
            data: {
                user: {
                    login: 'Medved',
                    name: 'Медведь'
                }
            }
        };

        setTimeout(() => {
            loadApplication(appLoadedData);
        }, 1000);
    }

    render () {

        const {isLoaded, appData} = this.props;

        if (!isLoaded) {
            return (
                <div>Wait, application is loading...</div>
            );
        }

        return (
            <div>Application Container</div>
        );
    }

}

export default connect(mapStateToProps, matchDispatchToProps)(AppContainer);