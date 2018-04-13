export const loadApplication = (appData) => {
    return {
        type: 'APP_COMMON_LOAD',
        payload: appData
    }
};