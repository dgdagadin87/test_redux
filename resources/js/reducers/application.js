export default function (state = {isLoaded: false, data: false}, action) {
    switch (action.type) {
        case 'APP_COMMON_LOAD':
            return action.payload;
        default:
            return state;
    }
}