import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCurrentState } from '../providers/CurrentStateProvider';
import { useDeckRepository } from '../providers/DeckRepositoryProvider';
import { AddDeckDTO, Deck } from '../classes/Deck';
import { AddDeckDialog } from '../modules/AddDeckDialog';
import { object, string } from 'prop-types';
import LogoutComponent from '../components/LogoutComponent';
import TitleComponent from '../components/TitleComponent';

const SearchView = () => {
    const navigate = useNavigate();

    const [privateDecks, setPrivateDecks] = useState<Deck[]>([]);
    const [onlineDecks, setOnlineDecks] = useState<Deck[]>([]);
    const [showPrivateDecks, setShowPrivateDecks] = useState(true);
    const [isAddDeckDialog, setIsAddDeckDialog] = useState(false)
    const [query, setQuery] = useState<string>("")

    const filteredPrivateDecks = useMemo(() => {
        return privateDecks.filter((deck: Deck) => {
            return deck.name.toLowerCase().includes(query.toLowerCase())
        })
    }, [privateDecks, query]);

    const filteredOnlineDecks = useMemo(() => {
        return onlineDecks.filter((deck: Deck) => {
            return deck.name.toLowerCase().includes(query.toLowerCase())
        })
    }, [onlineDecks, query]);

    const currentState = useCurrentState();
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
        if (!user) return logout();

        try {
            const deckList = await deckRepository.getPrivateDecks(user.id);
            console.log(deckList);
            if (deckList && deckList.length > 0)
                setPrivateDecks(deckList);
        } catch (error) {
            console.error(error);
        }
    };

    const getOnlineDecks = async () => {
        const user = currentState.getCurrentUser();
        if (!user) return logout();

        try {
            const deckList = await deckRepository.getOnlineDecks(user.id);
            console.log(deckList);
            if (deckList && deckList.length > 0)
                setOnlineDecks(deckList);
        } catch (error) {
            console.error(error);
        }
    };

    const onlineToggle = () => {
        setShowPrivateDecks(!showPrivateDecks);
    };

    const addDeck = async (data: AddDeckDTO) => {
        const user = currentState.getCurrentUser();
        if (!user) return logout();

        const deck = {
            id: 0,
            name: data.name,
            flashcards: [],
            author: user,
            isPublic: false,
        };

        try {
            await deckRepository.addDeck(deck);
            setIsAddDeckDialog(false)
            getPrivateDecks();
        } catch (error) {
            console.error(error);
        }
    };

    const editDeck = (deck: Deck) => {
        navigate(`/deck/${deck.id}`);
    };

    const deleteDeck = async (deck: Deck) => {
        try {
            await deckRepository.deleteDeck(deck.id)
            getPrivateDecks();
        } catch (error) {
            console.error(error)
        }
    }

    const logout = () => {
        currentState.removeCurrentUser();
        navigate('/login');
    };

    return (
        <div>
            <style>
                {`
                    #deck-options,
                    .deck {
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
                    
                    #deck-container {
                        height: 75vh;
                        margin: 10px;
                    }
                    
                    .deck-list {
                        height: 100%;
                        border: 2px solid;
                        overflow-y: auto;
                    }
                    
                    #deck-options {
                        justify-content: center;
                    }
                    
                    .deck {
                        position: relative;
                        align-items: center;
                        margin: 10px;
                        padding: 0px 10px;
                        background-color: gray;
                        height: 20%;
                    }
                    
                    .delete-deck-btn {
                        position: absolute;
                        top: 15px;
                        right: 15px;
                    }
                    
                    .is-deck-public {
                        position: absolute;
                        bottom: 15px;
                        right: 15px;
                    }
                `}
            </style>
            <header>
                <TitleComponent title='Wyszukiwarka talii' />
                <LogoutComponent onClick={logout} />
            </header>
            <div id="deck-options">
                <input value={query} type="text" placeholder="Wyszukaj talie" onChange={(e) => setQuery(e.target.value)} />
                <button id="add-deck-btn" onClick={() => setIsAddDeckDialog(true)}>Dodaj</button>
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
                    {filteredPrivateDecks
                        .map((deck) => (
                            <div
                                key={deck.id}
                                className="deck"
                                onClick={() => editDeck(deck)}
                            >
                                <div className="name">{deck.name.toUpperCase()}</div>
                                <FontAwesomeIcon
                                    className="delete-deck-btn"
                                    icon={faTrash}
                                    onClick={(e) => { e.stopPropagation(); deleteDeck(deck) }}
                                />
                                {deck.isPublic && (
                                    <FontAwesomeIcon
                                        className="is-deck-public"
                                        icon={faCloud}
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
                    {filteredOnlineDecks
                        .map((deck) => (
                            <div
                                key={deck.id}
                                className="deck"
                                onClick={() => editDeck(deck)}
                            >
                                <div className="name">{deck.name.toUpperCase()}</div>
                                {deck.isPublic && (
                                    <FontAwesomeIcon
                                        className="is-deck-public"
                                        icon={faCloud}
                                    />
                                )}
                            </div>
                        ))}
                </div>
            </div>

            <AddDeckDialog open={isAddDeckDialog} onSubmit={addDeck} onCancel={() => setIsAddDeckDialog(false)} />
        </div>
    );
};

export default SearchView;
