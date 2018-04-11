import $ from 'jquery';

function isEmpty(value){
    if (value === null || value === '' || value === undefined ){
        return true;
    }
    else {
        return false;
    }
};

function applyParams (object, config) {
    let property;
    if (object) {
        for (property in config) {
            object[property] = config[property];
        }
    }
    return object;
};

function createUrl (settings, url) {
    return settings['serverProtocol'] + '://' + settings['serverHost'] + ':' + settings['serverPort'] + url;
};

export {isEmpty, createUrl, applyParams};