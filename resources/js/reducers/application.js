export default function (state = null, action) {
    switch (action.type) {
        case 'APP_COMMON_LOAD':
            return action.payload;
        default:
            return {
                isLoaded: false,
                data: false
            };
    }
}