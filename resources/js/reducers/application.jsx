const initialState = {
    isLoaded: false,
    data: false
};

export default function (state = null, action) {

    let {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case 'APP_COMMON_LOAD':
            return payload;
        case 'ERROR_APP_COMMON':
            return payload;
        default:
            return returnState;

    }
}