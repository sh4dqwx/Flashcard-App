import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentState } from '../providers/CurrentStateProvider';
import LogoutComponent from '../components/LogoutComponent';
import TitleComponent from '../components/TitleComponent';
import ReturnComponent from '../components/ReturnComponent';

const SummaryView = () => {
    const navigate = useNavigate();
    const { deckId } = useParams();
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
                      
                      #summary-info {
                        width: 20vw;
                        margin: 50px auto;
                        padding: 10px;
                        border: 2px solid;
                      }
                      
                      #summary-options {
                        text-align: center;
                      }
                `}
            </style>
            <header>
                <TitleComponent title='Podsumowanie [powtórki/testu]' />
                <LogoutComponent onClick={logout} />
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
                <ReturnComponent onClick={() => navigate(`/deck/${deckId}`)} />
            </div>
        </div>
    );
};

export default SummaryView;
