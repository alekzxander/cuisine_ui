import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';

const Menu = (props) => {
    return (
        <div className="menu-card">
            <img src={props.image} alt="" className="img-menu" />
            <div className="descriptive">
                <h5>{props.title}</h5>
                {props.chef ? <h6>Chef : <Link scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} to={`/cooker/${props.cookerId}/#chef-page`}>{props.chef}</Link></h6> : ''}
                <p>type : <em>{props.type.map(types => ` - ${types.type.name} `)}</em> </p>
                <p>Prix/Personne : <strong>{props.price} €</strong></p>
                <Link scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} to={`/menu/${props.idMenu}/#menu-selected`} className="btn-zot">découvrez le menu</Link>
            </div>
        </div>
    )
}

export default Menu;