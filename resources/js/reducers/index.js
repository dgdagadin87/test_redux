import {combineReducers} from 'redux';
import application from './application';

const allReducers = combineReducers({
    commonData: application
});

export default allReducers;