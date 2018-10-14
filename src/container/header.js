import React from 'react'
import Navbar from '../component/navbar';
import Carousel from '../component/carousel';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div style={{ position: 'relative' }}>
            <Navbar />
            <Carousel />
        </div>);
    }
}

export default Header;