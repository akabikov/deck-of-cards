import React from 'react';
import Card from "./Card";
import "./Deck.css";

const NEW_DECK_API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle";
const NEW_CARD_API_URL = "https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/";

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

    getNewCard = async () => {
        const {deckId} = this.state;
        if (!deckId) return;

        const cardUrl = NEW_CARD_API_URL.replace("<<deck_id>>", deckId);
        let response = await fetch(cardUrl);
        if (response.ok) {
            let json = await response.json();
            if (!json.success) return;
            this.setState(st => ({
                cards: [...st.cards, json.cards[0]]
            }))

        } else {
            throw new Error("Can't load card");
        }
    }

       render() {
        const {deckId, cards} = this.state;
        const cardList = cards.map(card => (
            <Card key={card.code} imgUrl={card.images.png} code={card.code} />
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