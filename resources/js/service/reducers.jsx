import {combineReducers} from 'redux';
import application from '../reducers/application';
import books from '../reducers/books';

const allReducers = combineReducers({
    commonData: application,
    booksData: books
});

export default allReducers;