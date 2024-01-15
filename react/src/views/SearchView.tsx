import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCurrentState } from '../providers/CurrentStateProvider';
import { useDeckRepository } from '../providers/DeckRepositoryProvider';
import { Deck } from '../classes/Deck';
import { string } from 'prop-types';

const SearchView = () => {
    const navigate = useNavigate();
    const [editIcon] = useState(faPen);
    const [deleteIcon] = useState(faTrash);
    const [publicIcon] = useState(faCloud);
    const [privateDecks, setPrivateDecks] = useState<Deck[]>([]);
    const [onlineDecks, setOnlineDecks] = useState<Deck[]>([]);
    const [filteredPrivateDecks, setFilteredPrivateDecks] = useState<Deck[]>([]);
    const [filteredOnlineDecks, setFilteredOnlineDecks] = useState<Deck[]>([]);
    const [showPrivateDecks, setShowPrivateDecks] = useState(true);

    const currentState = useCurrentState();
    const searchInputRef = useRef(null);
    const deckRepository = useDeckRepository()

    useEffect(() => {
        const currentUser = currentState.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
        } else {
            Promise.all([
                getPrivateDecks(),
                getOnlineDecks()
            ])
        }
    }, []);

    const getPrivateDecks = async () => {
        const user = currentState.getCurrentUser();
        if (!user) {
            return logout();
        }

        try {
            const deckList = await deckRepository.getPrivateDecks(user.id);
            if (deckList && deckList.length > 0)
                setPrivateDecks(deckList);
        } catch (error) {
            console.error(error);
        }
    };

    const getOnlineDecks = async () => {
        try {
            const deckList = await deckRepository.getOnlineDecks();
            if (deckList && deckList.length > 0)
                setOnlineDecks(deckList);
        } catch (error) {
            console.error(error);
        }
    };

    const onlineToggle = () => {
        setShowPrivateDecks(!showPrivateDecks);
        setFilteredOnlineDecks(onlineDecks);
    };

    const addDeck = async () => {
        const result = prompt('Podaj nazwę talii:');
        if (!result) return;

        const user = currentState.getCurrentUser();
        if (!user) return logout();

        const deck = {
            id: 0,
            name: result,
            flashcards: [],
            author: user,
            isPublic: false,
        };

        try {
            await deckRepository.addDeck(deck);
            getPrivateDecks();
        } catch (error) {
            console.error(error);
        }
    };

    const editDeck = (deck: Deck) => {
        navigate(`/deck/${deck.id}`);
    };

    const logout = () => {
        currentState.removeCurrentUser();
        navigate('/login');
    };

    return (
        <div>
            <header>
                <h1>Wyszukiwarka talii</h1>
                <button id="logout-btn" onClick={logout}>
                    Wyloguj
                </button>
            </header>
            <div id="deck-options">
                <input
                    type="text"
                    placeholder="Wyszukaj talie"
                    ref={searchInputRef}
                />
                <button id="add-deck-btn" onClick={addDeck}>
                    Dodaj
                </button>
                <button id="online-decks-btn" onClick={onlineToggle}>
                    <span>{showPrivateDecks ? 'Online' : 'Prywatne'}</span>
                </button>
            </div>
            <div id="deck-container">
                <div
                    style={{ display: showPrivateDecks ? 'block' : 'none' }}
                    id="private-deck-list"
                    className="deck-list"
                >
                    {privateDecks
                        .filter((deck) => {
                            const searchValue: string = searchInputRef.current || "";
                            return deck.name.toUpperCase().includes(searchValue.toUpperCase());
                        }
                        )
                        .map((deck) => (
                            <div
                                key={deck.id}
                                className="deck"
                                onClick={() => editDeck(deck)}
                            >
                                <div className="name">{deck.name.toUpperCase()}</div>
                                <FontAwesomeIcon
                                    className="delete-deck-btn"
                                    icon={deleteIcon}
                                />
                                {deck.isPublic && (
                                    <FontAwesomeIcon
                                        className="is-deck-public"
                                        icon={publicIcon}
                                    />
                                )}
                            </div>
                        ))}
                </div>
                <div
                    style={{ display: showPrivateDecks ? 'none' : 'block' }}
                    id="online-deck-list"
                    className="deck-list"
                >
                    {onlineDecks
                        .filter((deck) => {
                            const searchValue: string = searchInputRef.current || "";
                            return deck.name.toUpperCase().includes(searchValue.toUpperCase());
                        })
                        .map((deck) => (
                            <div
                                key={deck.id}
                                className="deck"
                                onClick={() => editDeck(deck)}
                            >
                                <div className="name">{deck.name.toUpperCase()}</div>
                                <FontAwesomeIcon
                                    className="delete-deck-btn"
                                    icon={deleteIcon}
                                />
                                {deck.isPublic && (
                                    <FontAwesomeIcon
                                        className="is-deck-public"
                                        icon={publicIcon}
                                    />
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SearchView;
