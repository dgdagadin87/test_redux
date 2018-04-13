const initialState = {
    errors: []
};

export default function (state = null, action) {

    let {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case 'ERROR_BOOKS_LOADING':
            const {errorMessage = null} = payload;
            const errors = returnState.errors || [];
            const returnResult = {
                errors: errors.concat([errorMessage])
            };
            return returnResult;
        case 'ERRORS_CLEAN':
            return initialState;
        default:
            return returnState;

    }
}