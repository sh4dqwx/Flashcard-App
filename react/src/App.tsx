import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginView from './views/LoginView';
import logo from './logo.svg';
import './App.css';
import SearchView from './views/SearchView';
import DeckView from './views/DeckView';
import ReviewView from './views/ReviewView';
import TestView from './views/TestView';
import SummaryView from './views/SummaryView';
import ErrorView from './views/ErrorView';
import { CurrentStateProvider } from './providers/CurrentStateProvider';
import { DeckRepositoryProvider } from './providers/DeckRepositoryProvider';
import { UserRepositoryProvider } from './providers/UserRepositoryProvider';
import { TestGeneratorProvider } from './providers/TestGeneratorProvider';

function App() {
  return (
    <CurrentStateProvider>
      <DeckRepositoryProvider>
        <UserRepositoryProvider>
          <TestGeneratorProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/search" element={<SearchView />} />
                <Route path="/deck/:deckId" element={<DeckView />} />
                <Route path="/review/:deckId" element={<ReviewView />} />
                <Route path="/test/:deckId" element={<TestView />} />
                <Route path="/summary/:deckId" element={<SummaryView />} />
                <Route path="/error" element={<ErrorView />} />
                <Route path="*" element={<Navigate to="/error" replace />} />
              </Routes>
            </Router>
          </TestGeneratorProvider>
        </UserRepositoryProvider>
      </DeckRepositoryProvider>
    </CurrentStateProvider>
  );
}

export default App;
