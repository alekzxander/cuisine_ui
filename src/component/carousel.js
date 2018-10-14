import React from 'react'
import { UncontrolledCarousel } from 'reactstrap';
import carou1 from '../images/carou1.png';
import carou2 from '../images/carou2.png';
import carou3 from '../images/carou3.png';
const items = [
    {
        src: carou1,
        altText: '',
        caption: '',
        header: ''
    },
    {
        src: carou2,
        altText: '',
        caption: '',
        header: ''
    },
    {
        src: carou3,
        altText: '',
        caption: '',
        header: ''
    }
];


const Carousel = () => <UncontrolledCarousel items={items} />;

export default Carousel;