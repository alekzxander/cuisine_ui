import React from 'react'
import { Link } from 'react-router-dom';
const Menu = (props) => {
    return (
        <div className="menu-card">
            <img src={props.image} alt="" className="img-menu" />
            <div className="descriptive">
                <h5>{props.title}</h5>
                <h6>Chef : {props.chef}</h6>
                <p>type : <em>{props.type.map(types => types.type.name)}</em> </p>
                <p>Prix/Personne : <strong>{props.price} €</strong></p>
                <Link to={`/menu/${props.idMenu}`} className="btn-zot">découvrez le menu</Link>
            </div>
        </div>
    )
}

export default Menu;