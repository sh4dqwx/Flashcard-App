import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeckRepository } from '../providers/DeckRepositoryProvider';
import { useTestGenerator } from '../providers/TestGeneratorProvider';
import { useCurrentState } from '../providers/CurrentStateProvider';
import { Deck } from '../classes/Deck';

const ReviewView = () => {
    const navigate = useNavigate();
    const { deckId } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentDeck, setCurrentDeck] = useState<Deck>()

    const currentState = useCurrentState()
    const deckRepository = useDeckRepository()
    const testGenerator = useTestGenerator()

    useEffect(() => {
        const currentUser = currentState.getCurrentUser()
        if (!currentUser) {
            navigate('/login');
        } else {
            const id = Number(deckId)
            deckRepository.getDeck(id).then((deck) => {
                testGenerator.generate(deck)
                setCurrentDeck(deck)
            })
        }
    }, [deckId])

    const logout = () => {
        currentState.removeCurrentUser()
        navigate('/login')
    };

    const next = (answer: number) => {
        if (!currentDeck) return;

        if (currentIndex + 1 >= currentDeck.flashcards.length) {
            navigate('/summary');
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
