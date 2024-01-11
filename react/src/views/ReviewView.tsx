import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TestGeneratorService } from '../../services/test-generator/test-generator.service';
import { IDeckRepository } from '../../interfaces/IDeckRepository';
import { Deck } from '../../classes/Deck';

const ReviewView = () => {
    const history = useHistory();
    const { deckId } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentDeck, setCurrentDeck] = useState(null);

    const deckRepository = new IDeckRepository();
    const testGenerator = new TestGeneratorService();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            history.push('/login');
        } else {
            const id = Number(deckId);
            deckRepository.getDeck(id).then((deck) => {
                testGenerator.generate(deck);
                setCurrentDeck(deck);
            });
        }
    }, [deckId, history]);

    const logout = () => {
        localStorage.removeItem('currentUser');
        history.push('/login');
    };

    const next = (answer) => {
        if (!currentDeck) return;

        if (currentIndex + 1 >= currentDeck.flashcards.length) {
            history.push('/summary');
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div>
            <header>
                <h1>Powtórka</h1>
                <button id="logout-btn" onClick={logout}>
                    Wyloguj
                </button>
            </header>
            <div id="review-flashcard">
                <h2>{currentDeck?.flashcards[currentIndex].question}</h2>
                <h2>{currentDeck?.flashcards[currentIndex].answer}</h2>
                <span>{currentIndex + 1}/{currentDeck?.flashcards.length}</span>
            </div>
            <div id="review-options">
                <button onClick={() => next(0)}>Łatwe</button>
                <button onClick={() => next(1)}>Trudne</button>
            </div>
        </div>
    );
};

export default ReviewView;
