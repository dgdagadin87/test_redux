import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/promise';

import React from 'react';
import reactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import history from './service/history';
import allReducers from './service/reducers';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import AppContainer from './components/AppContainer';

const store = createStore(allReducers, applyMiddleware(thunk));

reactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route
                    path="/"
                    render={ (props) => <AppContainer {...props} globalEvents={'EVENTS'} /> }
                />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);