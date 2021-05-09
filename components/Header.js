import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from '../routes';

class Header extends Component {

    render(){
        return (
            <Menu style={{ marginTop: '10px' }}>

                <Link route="/">
                    <a className="item">CrowdFund</a>
                </Link>

                <Menu.Menu position="right">
                    <Link route="/">
                        <a className="item">Campaigns</a>
                    </Link>

                    <Link route="/campaigns/new">
                        <a className="item">+</a>
                    </Link>
                </Menu.Menu>

            </Menu>
        );
    };
}


export default Header;