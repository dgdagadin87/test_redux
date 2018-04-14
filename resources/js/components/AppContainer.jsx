import '../../css/style.css';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Route, Switch } from 'react-router-dom';

import Axios from 'axios';

import {loadApplication, errorAppLoading} from '../actions/application';

import {defaultSettings, urlSettings} from '../config/settings';
import {createUrl} from '../core/coreUtils';

import HeaderComponent from './rootComponents/Header';
import ErrorsComponent from './rootComponents/ErrorsModalComponent';
import HomeComponent from './moduleComponents/HomeComponent';
import BooksComponent from './moduleComponents/BooksComponent';
import AboutComponent from './moduleComponents/AboutComponent';

const mapStateToProps = state => {
    return {
        isLoaded: state.commonData.isLoaded,
        appData: state.commonData.data,
        title: state.commonData.title
    }
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        loadApplication: loadApplication,
        errorAppLoading: errorAppLoading
    }, dispatch);
}

class AppContainer extends Component {

    componentDidMount() {

        const {loadApplication, errorAppLoading} = this.props;

        Axios.get(createUrl(defaultSettings, urlSettings['getCommonData']))
        .then( (response) => {
            const {data : {data = {}}} = response;
            loadApplication(Object.assign({data: data}, {isLoaded: true, title: 'Начало работы'}));
        })
        .catch((error) => {
            console.log('wat!!!');
            const {message = ''} = error;
            errorAppLoading({
                errorMessage: message
            });
        });
    }

    render () {

        const {isLoaded, appData, title} = this.props;

        if (!isLoaded) {
            return (
                <div>
                    <div>Wait, application is loading...</div>
                    <ErrorsComponent />
                </div>
            );
        }

        return (
            <div>
                <HeaderComponent commonData={appData} title={title} />

                <Switch>
                    <Route exact path="/" component={HomeComponent}/>
                    <Route path="/books" component={BooksComponent} />
                    <Route path="/about" component={AboutComponent} />
                </Switch>
            </div>
        );
    }

}

export default connect(mapStateToProps, matchDispatchToProps)(AppContainer);