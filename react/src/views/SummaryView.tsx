import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SummaryView = () => {
    const history = useHistory();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            logout();
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('currentUser');
        history.push('/login');
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
                <button onClick={() => history.push('/deck-creator')}>Powrót</button>
            </div>
        </div>
    );
};

export default SummaryView;
