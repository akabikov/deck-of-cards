import React from 'react';
import Card from "./Card";
import "./Deck.css";

const API_URL = {
    NEW_DECK: "https://deckofcardsapi.com/api/deck/new/shuffle",
    NEW_CARD: "https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/",
    TO_REPLACE: "<<deck_id>>"
};


class Deck extends React.Component {

    state = { deckId: "", cards: [], remaining: 0}

    async componentDidMount() {
        let response = await fetch(API_URL.NEW_DECK);
        if (response.ok) {
            let json = await response.json();
            if (!json.success) return;

            const {deck_id, remaining} = json;

            this.setState({
                deckId: deck_id, 
                remaining,
            });

        } else {
            throw new Error("Can't brand new deck");
        }
    }

    getCardUrl() {
        const {deckId} = this.state;
        return API_URL.NEW_CARD.replace(API_URL.TO_REPLACE, deckId);
    }

    getNewCard = async () => {
        let response = await fetch(this.getCardUrl());
        if (response.ok) {
            let json = await response.json();
            if (!json.success) return;

            const {code, value, suit, image} = json.cards[0];

            const newCard = {
                id: code, 
                name: `${value} OF ${suit}`, 
                img: image,
            };

            const {remaining} = json;

            this.setState(st => ({
                cards: [...st.cards, newCard],
                remaining,
            }))

        } else {
            throw new Error("Can't load card");
        }
    }

    render() {
        const {remaining, cards} = this.state;
        const cardList = cards.map(({id, name, img}) => (
            <Card 
                key =  {id} 
                name = {name} 
                img =  {img}
            />
        ))

        return (
            <div className="Deck">
                {(+remaining > 0) && 
                    <button 
                        className="Deck-btn" 
                        onClick={this.getNewCard}
                    >
                        Gimme a card!
                    </button>
                }
                <div className="cards">
                    {cardList}
                </div>
            </div>
        );
    }
}

export default Deck;