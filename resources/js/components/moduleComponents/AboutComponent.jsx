import React, {Component} from 'react';
import {connect} from 'react-redux';

class About extends Component {

    render() {

        return (
            <div>О программе</div>
        );
    }
}

export default connect()(About);