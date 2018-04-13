const initialState = {
    collection: false,
    sortField: 'bookName',
    sortType: 'ASC',
    searchTerm: '',
    page: 1,
    pages: 1,
    totalCount: 0,
    disabled: false,
    globalLoading: false
};

export default function (state = null, action) {

    const {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case 'BOOKS_LIST_LOADED':
            return {...payload, disabled: false, globalLoading: false};
        case 'START_BOOKS_LOADING':
            return {...payload, disabled: true, globalLoading: false};
        case 'START_BOOKS_GLOBAL_LOADING':
            return {...payload, disabled: false, globalLoading: true};
        case 'ERROR_BOOKS_LOADING':
            return {...returnState, disabled: false, globalLoading: false};
        default:
            return returnState;

    }
}