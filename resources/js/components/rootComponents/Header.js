import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import MenuLinkComponent from './MenuLinkComponent'

class Header extends Component {

    render () {

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
            </div>
        );
    }

}

export default Header;
