import React from 'react';
import Card from "./Card";
import "./Deck.css";

const NEW_DECK_API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle";
const NEW_CARD_API_URL = "https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/";
const CARD_OFFSET = {x: 15, y: 15, a: 45};

class Deck extends React.Component {

    state = { deckId: "", cards: [] }

    async componentDidMount() {
        let response = await fetch(NEW_DECK_API_URL);
        if (response.ok) {
            let json = await response.json();
            if (!json.success) return;
            this.setState({deckId: json.deck_id});
        } else {
            throw new Error("Can't brand new deck");
        }
    }

    getCardUrl() {
        const {deckId} = this.state;
        return NEW_CARD_API_URL.replace("<<deck_id>>", deckId);
    }

    getNewCard = async () => {
        let response = await fetch(this.getCardUrl());
        if (response.ok) {
            let json = await response.json();
            if (!json.success) return;
            this.setState(st => ({
                cards: [
                    ...st.cards, 
                    {...json.cards[0], offset: this.genPos(CARD_OFFSET)}
                ]
            }))

        } else {
            throw new Error("Can't load card");
        }
    }
    
    genPos({x, y, a}) {
        const d = scale => Math.floor((Math.random() - 0.5) * scale);
        return {dx: d(x), dy: d(y), ang: d(a)};
    }

    render() {
        const {deckId, cards} = this.state;
        const cardList = cards.map(card => (
            <Card 
                key={card.code} 
                card={card} 
            />
        ))

        return (
            <div className="Deck">
                <button className="Deck-new-card-button" onClick={this.getNewCard}>Gimme a card!</button>
                <div className="cards">
                    {deckId && cardList}
                </div>
            </div>
        );
    }
}

export default Deck;