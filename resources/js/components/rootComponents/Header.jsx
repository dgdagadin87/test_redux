import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MenuLinkComponent from './MenuLinkComponent'

class Header extends Component {

    constructor(props) {
        super();

        this.state = {
            title: props.title
        };
    }

    componentWillReceiveProps(props) {

        const {title} = props;

        this.setState({
            title: title
        });
    }

    render () {

        const {commonData: {user = {}}} = this.props;

        const {title} = this.state;

        return (
            <div>
                <MenuLinkComponent
                    activeOnlyWhenExact={true}
                    to={'/'}
                    label={'Главная'}
                />
                <MenuLinkComponent
                    activeOnlyWhenExact={false}
                    to={'/books'}
                    label={'Книги'}
                />
                <MenuLinkComponent
                    activeOnlyWhenExact={false}
                    to={'/about'}
                    label={'О программе'}
                />

                <div style={{padding: '10px 0'}}>Hellow, {user.userName}!</div>

                <strong>{title}</strong>

            </div>
        );
    }

}

Header.propTypes = {
    commonData: PropTypes.object.isRequired,
    title: PropTypes.any.isRequired
};

export default Header;
