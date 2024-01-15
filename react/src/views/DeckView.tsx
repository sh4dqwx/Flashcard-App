import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDialog } from 'react-st-modal';
import { useCurrentState } from '../providers/CurrentStateProvider';
import { useDeckRepository } from '../providers/DeckRepositoryProvider';
import { Deck, EditDeckDTO } from '../classes/Deck';
import { Flashcard } from '../classes/Flashcard';

const DeckView = () => {
    const navigate = useNavigate();
    const { deckId } = useParams();
    const dialog = useDialog();
    const [deck, setDeck] = useState<Deck>();
    const [isEditDeckDialog, setIsEditDeckDialog] = useState(false);
    const currentState = useCurrentState()
    const deckRepository = useDeckRepository()

    const editIcon = faPen;
    const deleteIcon = faTrash;

    useEffect(() => {
        const currentUser = currentState.getCurrentUser()
        if (!currentUser) {
            navigate('/login');
        } else {
            getDeck(Number(deckId))
            setIsEditDeckDialog(false)
        }
    }, [deckId])

    const getDeck = async (deckId: number) => {
        const deck = await deckRepository.getDeck(Number(deckId))
        setDeck(deck)
    }

    const editDeck = async (editDeckDTO: EditDeckDTO) => {
        if (!deck) return;
        const id = deck.id;
        setIsEditDeckDialog(false);
        await deckRepository.editDeck(id, editDeckDTO);
        await getDeck(id);
    }

    const addFlashcard = async () => {
        if (!deck) return;
        const id = deck.id;
        //const addFlashcardDTO = await dialog(AddFlashcardForm);
        //await deckRepository.addFlashcard(id, addFlashcardDTO);
        //await getDeck(id);
    };

    const deleteFlashcard = async (flashcard: Flashcard) => {
        if (!deck) return;
        const id = deck.id;
        await deckRepository.deleteFlashcard(id, flashcard.id);
        getDeck(id);
    };

    const shareDeck = () => {
        if (!deck) return
        deck.isPublic = !deck.isPublic
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
            <header>
                <h1>Kreator talii</h1>
                <button id="back-btn" onClick={() => navigate('/search')}>
                    Powrót
                </button>
                <button id="logout-btn" onClick={logout}>
                    Wyloguj
                </button>
            </header>
            <div id="deck-name">
                <h2>{deck?.name}</h2>
                <FontAwesomeIcon icon={editIcon} onClick={() => setIsEditDeckDialog(true)} />
            </div>
            <div id="deck-container">
                <div id="flashcard-list">
                    {deck?.flashcards.map((flashcard) => (
                        <div key={flashcard.id} className="flashcard">
                            <div className="question">{flashcard.question}</div>
                            <div className="answer">{flashcard.answer}</div>
                            <FontAwesomeIcon
                                className="delete-flashcard-btn"
                                icon={deleteIcon}
                                onClick={() => deleteFlashcard(flashcard)}
                            />
                        </div>
                    ))}
                </div>
                <div id="deck-options">
                    <button id="add-flashcard-btn" onClick={addFlashcard}>
                        Dodaj
                    </button>
                    <button onClick={goToReview}>Powtórka</button>
                    <button onClick={goToTest}>Test</button>
                    <button onClick={shareDeck}>Udostępnij</button>
                </div>
            </div>

            {/* {isEditDeckDialog && (
                <EditDeckForm deckData={{ name: deck?.name || '' }} onDeckEdited={editDeck} />
            )} */}
        </div>
    );
};

export default DeckView;