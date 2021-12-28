import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <jumbotron fluid>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1>Nucamp</h1>
                                <h2>a better way to camp</h2>
                            </div>
                        </div>
                    </div>
                </jumbotron>

                <Navbar dark stickey="top">
                    <div classNAme="container">
                        <NavbarBrand href="/">Nucamp</NavbarBrand>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;