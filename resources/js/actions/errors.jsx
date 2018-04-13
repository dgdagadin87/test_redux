export const cleanErrors = (appData) => {
    return {
        type: 'ERRORS_CLEAN',
        payload: appData
    }
};