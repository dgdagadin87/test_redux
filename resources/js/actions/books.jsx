export const loadBooks = (loadData) => {
    return {
        type: 'BOOKS_LIST_LOADED',
        payload: loadData
    }
};

export const startBooksLoading = (loadData) => {
    return {
        type: 'START_BOOKS_LOADING',
        payload: loadData
    }
};

export const startBooksGlobalLoading = (loadData) => {
    return {
        type: 'START_BOOKS_GLOBAL_LOADING',
        payload: loadData
    }
};

export const errorBooksLoading = (loadData) => {
    return {
        type: 'ERROR_BOOKS_LOADING',
        payload: loadData
    }
};