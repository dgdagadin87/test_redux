import {combineReducers} from 'redux';
import application from '../reducers/application';
import books from '../reducers/books';
import errors from '../reducers/errors';

const allReducers = combineReducers({
    commonData: application,
    booksData: books,
    errorsData: errors
});

export default allReducers;