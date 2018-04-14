import React, {Component} from 'react';
import {connect} from 'react-redux';

class Home extends Component {

    render () {

        return (
            <div>Домашняя страница</div>
        );
    }

}

export default connect()(Home);