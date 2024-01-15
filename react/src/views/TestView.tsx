import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentState } from '../providers/CurrentStateProvider';
import { Deck } from '../classes/Deck';
import { useTestGenerator } from '../providers/TestGeneratorProvider';
import { useDeckRepository } from '../providers/DeckRepositoryProvider';

const TestView = () => {
    const navigate = useNavigate();
    const { deckId } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentDeck, setCurrentDeck] = useState<Deck>()
    const [firstRandomIndex, setFirstRandomIndex] = useState(0)
    const [secondRandomIndex, setSecondRandomIndex] = useState(0)
    const [thirdRandomIndex, setThirdRandomIndex] = useState(0)
    const currentState = useCurrentState()
    const deckRepository = useDeckRepository()
    const testGenerator = useTestGenerator()

    useEffect(() => {
        const currentUser = currentState.getCurrentUser();
        if (!currentUser) {
            logout();
        } else {
            getDeck(Number(deckId));
        }
    }, []);

    const getDeck = async (deckId: number) => {
        try {
            const deck = await deckRepository.getDeck(deckId)
            testGenerator.generate(deck);
            setCurrentDeck(deck);
            setRandomIndices(deck);
        } catch (error) {
            console.error(error);
        }
    };

    const generateTest = (deck: Deck) => {

    };

    const setRandomIndices = (deck: Deck) => {
        setFirstRandomIndex(Math.floor(Math.random() * deck.flashcards.length));
        setSecondRandomIndex(Math.floor(Math.random() * deck.flashcards.length));
        setThirdRandomIndex(Math.floor(Math.random() * deck.flashcards.length));
    };

    const logout = () => {
        currentState.removeCurrentUser();
        navigate('/login');
    };

    const next = (answer: number) => {
        if (!currentDeck) return;

        if (currentIndex + 1 >= currentDeck.flashcards.length) {
            navigate('/summary');
        } else {
            setCurrentIndex(currentIndex + 1);
            setRandomIndices(currentDeck);
        }
    };

    return (
        <div>
            <header>
                <h1>Test</h1>
                <button id="logout-btn" onClick={logout}>
                    Wyloguj
                </button>
            </header>
            <div id="test-flashcard">
                <h2>{currentDeck?.flashcards[currentIndex].question}</h2>
                <span>
                    {currentIndex + 1}/{currentDeck?.flashcards.length}
                </span>
            </div>
            <div>
                <div id="options-row">
                    <button onClick={() => next(0)}>
                        a: {currentDeck?.flashcards[currentIndex].answer}
                    </button>
                    <button onClick={() => next(1)}>
                        b: {currentDeck?.flashcards[firstRandomIndex].answer}
                    </button>
                </div>
                <div id="options-row">
                    <button onClick={() => next(2)}>
                        c: {currentDeck?.flashcards[secondRandomIndex].answer}
                    </button>
                    <button onClick={() => next(3)}>
                        d: {currentDeck?.flashcards[thirdRandomIndex].answer}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestView;
