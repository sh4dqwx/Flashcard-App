import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDialog } from 'react-st-modal';
import AddFlashcardForm from '../../modules/AddFlashcardForm';
import EditDeckForm from '../../modules/EditDeckForm';
import { Deck, EditDeckDTO } from '../../classes/Deck';
import { IDeckRepository } from '../../interfaces/IDeckRepository';
import { DeckRepositoryService } from '../../services/deck-repository/deck-repository.service';
import { TestGeneratorService } from '../../services/test-generator/test-generator.service';

const DeckView = () => {
    const history = useHistory();
    const { deckId } = useParams();
    const dialog = useDialog();
    const [deck, setDeck] = useState(null);
    const [isEditDeckDialog, setIsEditDeckDialog] = useState(false);

    const deckRepository = new DeckRepositoryService();
    const testGenerator = new TestGeneratorService();

    const editIcon = faPen;
    const deleteIcon = faTrash;

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            history.push('/login');
        } else {
            getDeck(Number(deckId));
            setIsEditDeckDialog(false);
        }
    }, [deckId, history]);

    const getDeck = (id) => {
        deckRepository.getDeck(id).then((result) => {
            setDeck(result);
        });
    };

    const showEditDeckDialog = () => {
        setIsEditDeckDialog(true);
    };

    const editDeck = async (editDeckDTO) => {
        if (!deck) return;
        const id = deck.id;
        setIsEditDeckDialog(false);
        await deckRepository.editDeck(id, editDeckDTO);
        getDeck(id);
    };

    const addFlashcard = async () => {
        if (!deck) return;
        const id = deck.id;
        const addFlashcardDTO = await dialog(AddFlashcardForm);
        await deckRepository.addFlashcard(id, addFlashcardDTO);
        getDeck(id);
    };

    const deleteFlashcard = async (flashcard) => {
        if (!deck) return;
        const id = deck.id;
        await deckRepository.deleteFlashcard(id, flashcard.id);
        getDeck(id);
    };

    const shareDeck = () => {
        if (!deck) return;
        deck.isPublic = !deck.isPublic;
    };

    const goToTest = () => {
        if (deck) {
            history.push(`/test/${deck.id}`);
        }
    };

    const goToReview = () => {
        if (deck) {
            history.push(`/review/${deck.id}`);
        }
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        history.push('/login');
    };

    return (
        <div>
            <header>
                <h1>Kreator talii</h1>
                <button id="back-btn" onClick={() => history.push('/search')}>
                    Powrót
                </button>
                <button id="logout-btn" onClick={logout}>
                    Wyloguj
                </button>
            </header>
            <div id="deck-name">
                <h2>{deck?.name}</h2>
                <FontAwesomeIcon icon={editIcon} onClick={showEditDeckDialog} />
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

            {isEditDeckDialog && (
                <EditDeckForm deckData={{ name: deck?.name || '' }} onDeckEdited={editDeck} />
            )}
        </div>
    );
};

export default DeckView;