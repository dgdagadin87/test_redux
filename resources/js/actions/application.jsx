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

export const errorAppLoading = (appData) => {
    return {
        type: 'ERROR_APP_LOADING',
        payload: appData
    }
};

export const errorDefaultLoading = (errorData) => {
    return {
        type: 'ERROR_DEFAULT_LOADING',
        payload: errorData
    }
};