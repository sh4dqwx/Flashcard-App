import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCurrentState } from '../providers/CurrentStateProvider';
import { useDeckRepository } from '../providers/DeckRepositoryProvider';
import { Deck, EditDeckDTO } from '../classes/Deck';
import { AddFlashcardDTO, Flashcard } from '../classes/Flashcard';
import { EditDeckDialog } from '../modules/EditDeckDialog';
import { AddFlashcardDialog } from '../modules/AddFlashcardDialog';
import LogoutComponent from '../components/LogoutComponent';
import TitleComponent from '../components/TitleComponent';
import ReturnComponent from '../components/ReturnComponent';

const DeckView = () => {
    const navigate = useNavigate();
    const { deckId } = useParams();

    const [deck, setDeck] = useState<Deck>()
    const [isAddFlashcardDialog, setIsAddFlashcardDialog] = useState<boolean>(false)
    const [isEditDeckDialog, setIsEditDeckDialog] = useState<boolean>(false)

    const currentState = useCurrentState()
    const deckRepository = useDeckRepository()

    useEffect(() => {
        const currentUser = currentState.getCurrentUser()
        if (!currentUser) {
            navigate('/login');
        } else {
            getDeck(Number(deckId))
        }
    }, [deckId])

    const getDeck = async (deckId: number) => {
        const deck = await deckRepository.getDeck(Number(deckId))
        setDeck(deck)
    }

    const editDeck = async (editDeckDTO: EditDeckDTO) => {
        if (!deck) return;
        const id = deck.id;
        await deckRepository.editDeck(id, editDeckDTO);
        setIsEditDeckDialog(false)
        await getDeck(id);
    }

    const addFlashcard = async (data: AddFlashcardDTO) => {
        if (!deck) return;
        const id = deck.id;
        await deckRepository.addFlashcard(id, data);
        setIsAddFlashcardDialog(false)
        await getDeck(id);
    };

    const deleteFlashcard = async (flashcard: Flashcard) => {
        if (!deck) return;
        const id = deck.id;
        await deckRepository.deleteFlashcard(id, flashcard.id);
        getDeck(id);
    };

    const shareDeck = () => {
        if (!deck) return
        setDeck((prevDeck: Deck | undefined) => {
            if (!prevDeck) return
            return { ...prevDeck, isPublic: !prevDeck.isPublic }
        })
        deckRepository.makeDeckPublic(deck.id)
    };

    const goToTest = () => {
        if (!deck) return
        navigate(`/test/${deck.id}`)
    };

    const goToReview = () => {
        if (!deck) return
        navigate(`/review/${deck.id}`)
    };

    const logout = () => {
        currentState.removeCurrentUser()
        navigate('/login')
    };

    return (
        <div>
            <style>
                {`
                    #deck-name,
                    #deck-container,
                    #deck-options,
                    .flashcard,
                    .question,
                    .answer {
                        display: flex;
                    }
                    
                    header {
                        position: relative;
                        text-align: center;
                    }
                    
                    #return-btn {
                        position: absolute;
                        top: 0px;
                        left: 10px;
                    }
                    
                    #logout-btn {
                        position: absolute;
                        top: 0px;
                        right: 10px;
                    }
                    
                    #deck-name,
                    #deck-container {
                        margin: 10px;
                    }
                    
                    #deck-name {
                        align-items: center;
                        gap: 10px;
                    }
                    
                    #deck-container {
                        height: 75vh;
                    }
                    
                    #flashcard-list {
                        flex: 3;
                        border: 2px solid;
                        overflow-y: auto;
                    }
                    
                    #deck-options {
                        flex: 1;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                    }
                    
                    #add-flashcard-btn {
                        margin-bottom: 30px;
                    }
                    
                    .flashcard {
                        position: relative;
                        align-items: center;
                        margin: 10px;
                        background-color: gray;
                        height: 20%;
                    }
                    
                    .question,
                    .answer {
                        flex: 2;
                        height: 100%;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .question {
                        border-right: 2px solid #000;
                    }
                    
                    .delete-flashcard-btn {
                        position: absolute;
                        top: 15px;
                        right: 15px;
                    }
                `}
            </style>
            <header>
                <TitleComponent title='Kreator talii' />
                <ReturnComponent onClick={() => navigate('/search')} />
                <LogoutComponent onClick={logout} />
            </header>
            <div id="deck-name">
                <h2>{deck?.name}</h2>
                <FontAwesomeIcon icon={faPen} onClick={() => setIsEditDeckDialog(true)} />
            </div>
            <div id="deck-container">
                <div id="flashcard-list">
                    {deck?.flashcards.map((flashcard) => (
                        <div key={flashcard.id} className="flashcard">
                            <div className="question">{flashcard.question}</div>
                            <div className="answer">{flashcard.answer}</div>
                            <FontAwesomeIcon
                                className="delete-flashcard-btn"
                                icon={faTrash}
                                onClick={() => deleteFlashcard(flashcard)}
                            />
                        </div>
                    ))}
                </div>
                <div id="deck-options">
                    <button id="add-flashcard-btn" onClick={() => setIsAddFlashcardDialog(true)}>Dodaj</button>
                    <button onClick={goToReview}>Powtórka</button>
                    <button onClick={goToTest}>Test</button>
                    <button onClick={shareDeck}>Udostępnij</button>
                </div>
            </div>

            <AddFlashcardDialog
                open={isAddFlashcardDialog}
                onSubmit={addFlashcard}
                onCancel={() => setIsAddFlashcardDialog(false)}
            />

            <EditDeckDialog
                open={isEditDeckDialog}
                prevData={{ name: deck?.name ?? "" }}
                onSubmit={editDeck}
                onCancel={() => setIsEditDeckDialog(false)}
            />
        </div>
    );
};

export default DeckView;
