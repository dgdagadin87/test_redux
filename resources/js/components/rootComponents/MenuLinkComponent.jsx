import React from 'react';
import {Route, Link} from 'react-router-dom';

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => {

    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({match}) => {
            return (
                <div style={{fontWeight: (match ? 'bold' : 'normal')}}
                     className={'link' + (match ? ' main-navigation__active' : '')}>
                    <Link to={to}>{label}</Link>
                </div>
            );
        }}/>
    );
};

export default OldSchoolMenuLink;