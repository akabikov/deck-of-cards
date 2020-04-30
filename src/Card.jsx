import React from 'react';
import "./Card.css";

class Card extends React.Component {

    

    render() {
        const {image, value, suit, offset} = this.props.card;

        const style = {transform: 
            `translate(${-50 + offset.dx}%, ${-50 + offset.dy}%) 
             rotate(${offset.ang}deg)`};

        return (
            <img 
                src={image} 
                alt={`${value} of ${suit.toLowerCase()}`} 
                className="Card" 
                style={style} 
            />
        );
    }
}

export default Card;