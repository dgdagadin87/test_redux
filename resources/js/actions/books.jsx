import {defaultSettings, urlSettings} from '../config/settings';
import {createUrl} from '../core/coreUtils';
import Axios from 'axios';

export const setBooksTitle = (headerData) => {
    return {
        type: 'APP_SET_HEADER',
        payload: headerData
    }
};

export const asyncGetBooks = (collection, actionData, queryData) => {
    return dispatch => {

        const startLoadingAction = collection === false ? 'START_BOOKS_GLOBAL_LOADING' : 'START_BOOKS_LOADING';

        dispatch({
            type: startLoadingAction,
            payload: actionData
        });

        Axios.get(createUrl(defaultSettings, urlSettings['getBooksData']), {
            params: queryData
        })
        .then( (response) => {

            const responseData = response.data || {};

            if (!responseData.isSuccess) {
                const errorPayload = {
                    errorMessage: responseData.message,
                    data: actionData
                };
                dispatch({
                    type: 'ERROR_BOOKS_LOADING',
                    payload: errorPayload
                });
                return;
            }

            const {data: {data = {}}} = response;
            const {collection = [], filter = {}, paging = {}} = data;

            dispatch({
                type: 'BOOKS_LIST_LOADED',
                payload: {collection, ...filter, ...paging}
            })
        })
        .catch((error) => {

            const {message = ''} = error;
            const errorPayload = {
                errorMessage: message
            };
            dispatch({
                type: 'ERROR_BOOKS_LOADING',
                payload: errorPayload
            });
        });

    }
};

export const asyncSendBookToMail = (bookId, emailToSend) => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['sendToMail'])}${bookId}`;

        Axios.post(urlToSend, {
            params: {
                email: emailToSend
            }
        })
        .then( (response) => {

            const responseData = response.data || {};

            if (!responseData.isSuccess) {
                dispatch({
                    type: 'ERROR_DEFAULT_LOADING',
                    payload: {
                        errorMessage: responseData.message
                    }
                });
                return;
            }

            alert('Книга успешно отправлена по почте.');
        })
        .catch((error) => {

            const {message = ''} = error;
            dispatch({
                type: 'ERROR_DEFAULT_LOADING',
                payload: {
                    errorMessage: message
                }
            });
        });

    }
};

export const asyncDeleteBook = (bookId, loadBooksCallback) => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['deleteMyBook'])}${bookId}`;

        dispatch({
            type: 'START_BOOKS_LOADING',
            payload: {}
        });

        Axios.get(urlToSend)
        .then( (response) => {

            const responseData = response.data || {};

            if (!responseData.isSuccess) {
                dispatch({
                    type: 'ERROR_BOOKS_LOADING',
                    payload: {
                        errorMessage: responseData.message
                    }
                });
                return;
            }

            alert('Книга успешно удалена.');
            loadBooksCallback();
        })
        .catch((error) => {

            const {message = ''} = error;
            dispatch({
                type: 'ERROR_BOOKS_LOADING',
                payload: {
                    errorMessage: message
                }
            });
        });
    }
};