import React from 'react';
import "./Card.css";

class Card extends React.Component {
    render() {
        return (
            <img src={this.props.imgUrl} alt=""/>
        );
    }
}

export default Card;