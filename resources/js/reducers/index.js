import {combineReducers} from 'redux';
import testReducer from './testReducer';

const allReducers = combineReducers({
    testData: testReducer
});

export default allReducers;