import React from 'react';
import Card from "./Card";
import "./Deck.css";

class Deck extends React.Component {
    render() {
        return (
            <div>
                Deck
                <Card />
            </div>
        );
    }
}

export default Deck;