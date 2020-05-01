import React from 'react';
import "./Card.css";

const CARD_OFFSET = {x: 15, y: 15, a: 45};

class Card extends React.Component {

    constructor(props) {
        super(props);
        const {dx, dy, ang} = this.genPos(CARD_OFFSET);

        this.style = {transform: 
            `translate(${dx}%, ${dy}%) 
             rotate(${ang}deg)`};
    }
        
    genPos({x, y, a}) {
        const d = scale => Math.floor((Math.random() - 0.5) * scale);
        return {dx: d(x), dy: d(y), ang: d(a)};
    }

    render() {
        const {name, img} = this.props;
        const style = this.style;

        return (
            <img 
                src={img} 
                alt={name} 
                className="Card" 
                style={style} 
            />
        );
    }
}

export default Card;