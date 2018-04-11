import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MenuLinkComponent from './MenuLinkComponent'

class Header extends Component {

    render () {

        const {commonData: {user = {}}} = this.props;

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

            </div>
        );
    }

}

Header.propTypes = {
    commonData: PropTypes.object.isRequired
};

export default Header;
