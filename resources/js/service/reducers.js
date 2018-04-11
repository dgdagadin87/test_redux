import {combineReducers} from 'redux';
import application from '../reducers/application';

const allReducers = combineReducers({
    commonData: application
});

export default allReducers