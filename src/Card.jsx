import React from 'react';
import "./Card.css";

class Card extends React.Component {
    render() {
        const {imgUrl, code} = this.props;

        let style = {};

        return (
            <img src={imgUrl} alt={code} className="Card" style={style}/>
        );
    }
}

export default Card;