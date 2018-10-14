import React from 'react'

const Comment = (props) => {
    return (<div className="comment">
        <img className="image-user" src={props.image} alt={props.alt} />
        <p className="text-center">Note : </p>
        <div className="note">
            <p className="text-center"> {props.goodNote.map((note, i) => {
                return <img key={i} className="note" src={note} alt="note" />
            })}
                {props.badNote.map((note, i) => {
                    return <img key={i} className="note" src={note} alt="note" />
                })}
            </p>
        </div>
        <h6 className="text-center">{props.name}</h6>
        <p className="text-comment text-center">{props.text}</p>
    </div>)
}

export default Comment;