const initialState = {
    isLoaded: false,
    data: false
};

export default function (state = null, action) {
    switch (action.type) {
        case 'APP_COMMON_LOAD':
            return action.payload;
        default:
            if (state === null) {
                return initialState;
            }
            else {
                return state;
            }

    }
}