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

class About extends Component {

    componentDidMount() {

        let {setTitle} = this.props;

        setTitle('О программе');
    }

    render() {

        return (
            <div>О программе</div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(About);