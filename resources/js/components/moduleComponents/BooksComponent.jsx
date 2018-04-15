import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import Axios from 'axios';

import {setTitle, errorDefaultLoading} from '../../actions/application';
import {
    loadBooks,
    startBooksGlobalLoading,
    startBooksLoading,
    errorBooksLoading
} from '../../actions/books';

import {createUrl} from '../../core/coreUtils';
import {defaultSettings, urlSettings, pageSettings} from '../../config/settings';

import PreloaderComponent from '../uiComponents/LargePreloaderComponent';
import SearchComponent from '../uiComponents/SearchComponent';
import TableComponent from '../uiComponents/TableComponent';
import PagingComponent from '../uiComponents/PagingComponent';

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
        setTitle: setTitle,
        loadBooks: loadBooks,
        startBooksLoading: startBooksLoading,
        startBooksGlobalLoading: startBooksGlobalLoading,
        errorBooksLoading: errorBooksLoading,
        errorDefaultLoading: errorDefaultLoading
    }, dispatch);
}

class Books extends Component {

    componentDidMount() {

        let {setTitle, collection, globalLoading, disabled} = this.props;

        setTitle('Список книг');

        if (collection === false && (!globalLoading && !disabled)) {
            this._loadData();
        }
    }

    _loadData(actionData = null) {

        const {collection, sortField, sortType, page, searchTerm} = this.props;
        const {startBooksGlobalLoading, startBooksLoading, loadBooks, errorBooksLoading} = this.props;

        const dataForAction = !!actionData ? actionData : {};

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

            const {message = ''} = error;
            errorBooksLoading({
                errorMessage: message
            });
        });
    }

    _onSortChange(sortData) {

        this._loadData(sortData);
    }

    _onPageChange(pageData) {

        this._loadData(pageData);
    }

    _onSearch(searchData) {

        this._loadData(searchData);
    }

    _onSendMail(bookId, emailToSend) {

        const {errorDefaultLoading} = this.props;
        const urlToSend = `${createUrl(defaultSettings, urlSettings['sendToMail'])}${bookId}`;

        Axios.post(urlToSend, {
            params: {
                email: emailToSend
            }
        })
        .then( (response) => {

            const responseData = response.data || {};

            if (!responseData.isSuccess) {
                errorDefaultLoading({
                    errorMessage: responseData.message
                });
                return;
            }

            alert('Книга успешно отправлена по почте.');
        })
        .catch((error) => {

            const {message = ''} = error;
            errorDefaultLoading({
                errorMessage: message
            });
        });
    }

    _onDeleteBook(bookId) {

        if (!confirm('Вы действительно хотите удалить книгу из раздела "Мои книги"?')) {
            return;
        }

        const {errorBooksLoading, startBooksLoading} = this.props;
        const urlToSend = `${createUrl(defaultSettings, urlSettings['deleteMyBook'])}${bookId}`;

        startBooksLoading({});

        Axios.get(urlToSend)
        .then( (response) => {

            const responseData = response.data || {};

            if (!responseData.isSuccess) {
                errorBooksLoading({
                    errorMessage: responseData.message
                });
                return;
            }

            alert('Книга успешно удалена.');
            this._loadData();
        })
        .catch((error) => {

            const {message = ''} = error;
            errorBooksLoading({
                errorMessage: message
            });
        });
    }

    _renderMyBooks() {

        const {history} = this.props;
        //const {user} = serverData;
        //const {userIsAdmin} = user;

        const {
            disabled,
            collection = [],
            sortField,
            sortType,
            page,
            pages,
            totalCount,
            searchTerm
        } = this.props;

        let myBooksUI = [];

        myBooksUI.push(
            <SearchComponent
                key={0}
                searchTerm={searchTerm}
                onSearch={this._onSearch.bind(this)}
                disabled={disabled}
                mode="simple"
            />
        );

        myBooksUI.push(
            <TableComponent
                key={1}
                routerHistory={history}
                isAdmin={true}
                items={!collection ? [] : collection}
                showCheckColumn={true}
                totalCount={totalCount}
                controlMode="mybooks"
                onSortChange={this._onSortChange.bind(this)}
                onSendMail={this._onSendMail.bind(this)}
                onDeleteBook={this._onDeleteBook.bind(this)}
                sortField={sortField}
                sortType={sortType}
                disabled={disabled}
                columns={[
                    {
                        name: 'bookName',
                        title: 'Название',
                        sortable: true,
                        type: 'description'
                    },
                    {
                        name: 'bookAuthor',
                        title: 'Автор',
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'bookGenre',
                        title: 'Жанр',
                        sortable: false,
                        type: 'usual'
                    },
                    {
                        name: 'bookSize',
                        title: 'Размер',
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'bookParentSite',
                        title: 'С сайта',
                        sortable: true,
                        type: 'link'
                    }
                ]}
            />
        );

        myBooksUI.push(
            <PagingComponent
                key={2}
                pageSettings={pageSettings}
                page={page}
                pages={pages}
                disabled={disabled}
                onChange={this._onPageChange.bind(this)}
                onRefresh={this._loadData.bind(this)}
            />
        );

        return myBooksUI;
    }

    render () {

        const {globalLoading} = this.props;

        return (
            <div>
                {globalLoading ? <PreloaderComponent /> : this._renderMyBooks()}
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Books);