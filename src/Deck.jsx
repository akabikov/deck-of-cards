import React from 'react';
import Card from "./Card";
import "./Deck.css";

const NEW_DECK_API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle";
const NEW_CARD_API_URL = "https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/";


class Deck extends React.Component {

    state = { deckId: "", cards: [], remaining: 0}

    async componentDidMount() {
        let response = await fetch(NEW_DECK_API_URL);
        if (response.ok) {
            let json = await response.json();
            if (!json.success) return;
            this.setState({
                deckId: json.deck_id, 
                remaining: +json.remaining,
            });
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
                cards: [...st.cards, json.cards[0]],
                remaining: +json.remaining,
            }))

        } else {
            throw new Error("Can't load card");
        }
    }

    render() {
        const {remaining, cards} = this.state;
        const cardList = cards.map(card => (
            <Card 
                key={card.code} 
                card={card} 
            />
        ))

        return (
            <div className="Deck">
                {(remaining > 0) && 
                    <button 
                        className="Deck-new-card-button" 
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