import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import Axios from 'axios';

import {
    loadBooks,
    startBooksGlobalLoading,
    startBooksLoading,
    errorBooksLoading
} from '../../actions/books';

import {createUrl} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

const mapStateToProps = state => {
    return {
        collection: state.booksData.collection,
        sortField: state.booksData.sortField,
        sortType: state.booksData.sortType,
        searchTerm: state.booksData.searchTerm,
        page: state.booksData.page,
        pages: state.booksData.pages,
        totalCount: state.booksData.totalCount,
        disabled: state.booksData.disabled,
        globalLoading: state.booksData.globalLoading
    }
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        loadBooks: loadBooks,
        startBooksLoading: startBooksLoading,
        startBooksGlobalLoading: startBooksGlobalLoading,
        errorBooksLoading: errorBooksLoading,
    }, dispatch);
}

class Books extends Component {

    componentDidMount() {

        let {collection} = this.props;

        if (collection === false) {
            this._loadData();
        }
    }

    _getDataForAction() {

        const { collection, sortField, sortType, searchTerm, page, pages, totalCount, disabled, globalLoading } = this.props;

        return { collection, sortField, sortType, searchTerm, page, pages, totalCount, disabled, globalLoading };
    }

    _loadData() {

        const {collection, sortField, sortType, page, searchTerm} = this.props;
        const {startBooksGlobalLoading, startBooksLoading, loadBooks, errorBooksLoading} = this.props;

        const dataForAction = this._getDataForAction();

        if (collection === false) {
            startBooksGlobalLoading(dataForAction);
        }
        else {
            startBooksLoading(dataForAction);
        }

        let queryData = {
            sortField,
            sortType,
            page,
            searchTerm
        };

        Axios.get(createUrl(defaultSettings, urlSettings['getBooksData']), {
            params: queryData
        })
        .then( (response) => {

            const responseData = response.data || {};

            if (!responseData.isSuccess) {
                errorBooksLoading({
                    errorMessage: responseData.message,
                    data: dataForAction
                });
                return;
            }

            const {data: {data = {}}} = response;
            const {collection = [], filter = {}, paging = {}} = data;

            loadBooks({collection, ...filter, ...paging});
        })
        .catch((error) => {
            console.log(error);
        });

        /*ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['getMyBooksData']),
                data: queryData
            },
            {
                afterSuccess: (result) => {
                    if (!result.isSuccess) {
                        this.setStats({
                            globalLoading: false,
                            disabled: false
                        });
                        globalEvents.trigger('showError', result);
                        return;
                    }

                    this.setStats(
                        Object.assign({}, {
                            globalLoading: false,
                            disabled: false
                        }, this._getStateData(result.data))
                    );

                    this.mounted && globalEvents.trigger('setModuleData', result.data, 'mybooks');
                },
                afterError: (result) => {
                    this.setStats({
                        globalLoading: false,
                        disabled: false
                    });
                    globalEvents.trigger('showError', result);
                }
            }
        );*/
    }

    render () {

        const {collection, globalLoading} = this.props;

        if (globalLoading) {
            return (<div>Загружается...</div>);
        }
        else {

            if (collection !== false) {
                return (<div>Книги загружены</div>);
            }
            else {
                return (<div>!!!!!!!!!!!!!!</div>)
            }
        }

        return null;
    }


}

export default connect(mapStateToProps, matchDispatchToProps)(Books);