import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeckRepository } from '../providers/DeckRepositoryProvider';
import { useTestGenerator } from '../providers/TestGeneratorProvider';
import { useCurrentState } from '../providers/CurrentStateProvider';
import { Deck } from '../classes/Deck';
import LogoutComponent from '../components/LogoutComponent';
import TitleComponent from '../components/TitleComponent';

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
            navigate(`/summary/${deckId}`);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div>
            <style>
                {`
                    header {
                        position: relative;
                        text-align: center;
                      }
                      
                      #logout-btn {
                        position: absolute;
                        top: 0px;
                        right: 10px;
                      }
                      
                      #review-flashcard {
                        display: flex;
                        flex-direction: column;
                        margin: 50px auto;
                        height: 70vh;
                        width: 60vw;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        border: 2px solid;
                      }
                      
                      #review-options {
                        display: flex;
                        justify-content: center;
                        gap: 10px;
                      }
                `}
            </style>
            <header>
                <TitleComponent title='Powtórka' />
                <LogoutComponent onClick={logout} />
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
