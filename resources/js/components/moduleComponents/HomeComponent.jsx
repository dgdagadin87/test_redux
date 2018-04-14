import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setTitle} from '../../actions/application';

const mapStateToProps = () => {
    return {};
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch);
}

class Home extends Component {

    componentDidMount() {
console.log(this.props);
        let {setTitle} = this.props;

        setTitle('Домашняя страница');
    }

    render () {

        return (
            <div>Домашняя страница</div>
        );
    }

}

export default connect(mapStateToProps, matchDispatchToProps)(Home);