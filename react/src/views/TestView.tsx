import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const TestView = () => {
    const history = useHistory();
    const { deckId } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentDeck, setCurrentDeck] = useState(null);
    const [firstRandomIndex, setFirstRandomIndex] = useState(0);
    const [secondRandomIndex, setSecondRandomIndex] = useState(0);
    const [thirdRandomIndex, setThirdRandomIndex] = useState(0);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            logout();
        } else {
            getDeck();
        }
    }, []);

    const getDeck = async () => {
        try {
            const response = await fetch(`/api/decks/${deckId}`);
            const deck = await response.json();
            generateTest(deck);
            setCurrentDeck(deck);
            setRandomIndices(deck);
        } catch (error) {
            console.error(error);
        }
    };

    const generateTest = (deck) => {

    };

    const setRandomIndices = (deck) => {
        setFirstRandomIndex(Math.floor(Math.random() * deck.flashcards.length));
        setSecondRandomIndex(Math.floor(Math.random() * deck.flashcards.length));
        setThirdRandomIndex(Math.floor(Math.random() * deck.flashcards.length));
    };

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
