export const cleanErrors = (errorsData) => {
    return {
        type: 'ERRORS_CLEAN',
        payload: errorsData
    }
};