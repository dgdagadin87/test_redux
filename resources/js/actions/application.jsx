export const loadApplication = (appData) => {
    return {
        type: 'APP_COMMON_LOAD',
        payload: appData
    }
};

export const setTitle = (headerData) => {
    return {
        type: 'APP_SET_HEADER',
        payload: headerData
    }
};