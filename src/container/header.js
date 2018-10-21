import React from 'react'
import Navbar from '../component/navbar';
import Carousel from '../component/carousel';
import Login from '../component/login';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div style={{ position: 'relative' }}>
            <Navbar />
            <Carousel />
            <Login />

        </div>);
    }
}

export default Header;