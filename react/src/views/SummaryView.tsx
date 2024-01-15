import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentState } from '../providers/CurrentStateProvider';

const SummaryView = () => {
    const navigate = useNavigate();
    const currentState = useCurrentState();

    useEffect(() => {
        const currentUser = currentState.getCurrentUser();
        if (!currentUser) {
            logout();
        }
    }, []);

    const logout = () => {
        currentState.removeCurrentUser();
        navigate('/login');
    };

    return (
        <div>
            <header>
                <h1>Podsumowanie [powtórki/testu]</h1>
                <button id="logout-btn" onClick={logout}>
                    Wyloguj
                </button>
            </header>
            <div id="summary-info">
                <p>
                    <b>Wynik:</b> [ilość poprawnych]/[ilość wszystkich]
                </p>
                <p>
                    <b>Czas:</b> [czas ukończenia testu]
                </p>
            </div>
            <div id="summary-options">
                <button onClick={() => navigate('/deck-creator')}>Powrót</button>
            </div>
        </div>
    );
};

export default SummaryView;
