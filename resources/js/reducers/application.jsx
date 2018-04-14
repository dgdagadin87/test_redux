const initialState = {
    title: '',
    isLoaded: false,
    data: false
};

export default function (state = null, action) {

    let {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case 'APP_COMMON_LOAD':
            return payload;
        case 'ERROR_APP_LOADING':
            return initialState;
        case 'APP_SET_HEADER':
            document.title = payload;
            return {...returnState, title: payload};
        default:
            return returnState;

    }
}