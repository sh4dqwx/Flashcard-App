import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Deck } from '../../classes/Deck';
import { DeckRepositoryService } from '../../services/deck-repository/deck-repository.service';
import { User } from '../../classes/User';
import { DeckFormComponent } from '../../modules/deck-form/deck-form.component';

const SearchView = () => {
    const history = useHistory();
    const [editIcon] = useState(faPen);
    const [deleteIcon] = useState(faTrash);
    const [publicIcon] = useState(faCloud);
    const [privateDecks, setPrivateDecks] = useState([]);
    const [onlineDecks, setOnlineDecks] = useState([]);
    const [filteredPrivateDecks, setFilteredPrivateDecks] = useState([]);
    const [filteredOnlineDecks, setFilteredOnlineDecks] = useState([]);
    const [showPrivateDecks, setShowPrivateDecks] = useState(true);

    const searchInputRef = useRef(null);
    const deckRepository = new DeckRepositoryService();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            history.push('/login');
        } else {
            getPrivateDecks();
            getOnlineDecks();
        }
    }, [history]);

    const getPrivateDecks = async () => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) {
            return logout();
        }

        try {
            const deckList = await deckRepository.getPrivateDecks(user.id);
            setPrivateDecks(deckList);
        } catch (error) {
            console.error(error);
        }
    };

    const getOnlineDecks = async () => {
        try {
            const deckList = await deckRepository.getOnlineDecks();
            setOnlineDecks(deckList);
        } catch (error) {
            console.error(error);
        }
    };

    const onlineToggle = () => {
        setShowPrivateDecks(!showPrivateDecks);
        searchInputRef.current.value = '';
        setFilteredOnlineDecks(onlineDecks);
    };

    const addDeck = async () => {
        const result = prompt('Podaj nazwę talii:');
        if (!result) return;

        const user = JSON.parse(localStorage.getItem('currentUser'));
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

    const editDeck = (deck) => {
        history.push(`/deck/${deck.id}`);
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        history.push('/login');
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
                        .filter((deck) =>
                            deck.name.toUpperCase().includes(searchInputRef.current.value.toUpperCase())
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
                        .filter((deck) =>
                            deck.name.toUpperCase().includes(searchInputRef.current.value.toUpperCase())
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
            </div>
        </div>
    );
};

export default SearchView;
