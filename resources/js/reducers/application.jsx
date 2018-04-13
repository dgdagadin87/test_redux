const initialState = {
    isLoaded: false,
    data: false
};

export default function (state = null, action) {

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case 'APP_COMMON_LOAD':
            return action.payload;
        default:
            return returnState;

    }
}