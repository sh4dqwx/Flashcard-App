import { FC, ReactNode, createContext, useContext } from "react";
import { Deck, EditDeckDTO } from "../classes/Deck";
import { AddFlashcardDTO } from "../classes/Flashcard";
import axios, { AxiosResponse } from "axios";
import { environment } from "../environments/environment";

type DeckRepositoryContextType = {
  getPrivateDecks: (userId: number) => Promise<Deck[]>,
  getOnlineDecks: () => Promise<Deck[]>,
  getDeck: (deckId: number) => Promise<Deck>,
  addDeck: (deck: Deck) => Promise<void>,
  editDeck: (deckId: number, editDeckDTO: EditDeckDTO) => Promise<void>,
  addFlashcard: (deckId: number, addFlashcardDTO: AddFlashcardDTO) => Promise<void>,
  deleteFlashcard: (deckId: number, flashcardId: number) => Promise<void>,
}

const DeckRepositoryContext = createContext<DeckRepositoryContextType | null>(null)

export const useDeckRepository = (): DeckRepositoryContextType => {
  const context = useContext(DeckRepositoryContext)
  if (context == null) throw new Error("Context not initialized")
  return context
}

export const DeckRepositoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const apiUrl: string = environment.apiUrl

  const getPrivateDecks = async (userId: number): Promise<Deck[]> => {
    const response: AxiosResponse<Deck[]> = await axios.get(`${apiUrl}/decks/private/${userId}`)
    return response.data
  }

  const getOnlineDecks = async (): Promise<Deck[]> => {
    const response: AxiosResponse<Deck[]> = await axios.get(`${apiUrl}/decks/online`)
    return response.data
  }

  const getDeck = async (deckId: number): Promise<Deck> => {
    const response: AxiosResponse<Deck> = await axios.get(`${apiUrl}/decks/${deckId}`)
    return response.data
  }

  const addDeck = async (deck: Deck): Promise<void> => {
    const response: AxiosResponse<void> = await axios.post(`${apiUrl}/decks`, deck)
    return response.data
  }

  const editDeck = async (deckId: number, editDeckDTO: EditDeckDTO): Promise<void> => {
    const response: AxiosResponse<void> = await axios.put(`${apiUrl}/decks/${deckId}`, editDeckDTO)
    return response.data
  }

  const addFlashcard = async (deckId: number, addFlashcardDTO: AddFlashcardDTO): Promise<void> => {
    const response: AxiosResponse<void> = await axios.post(`${apiUrl}/decks/${deckId}/flashcards`, addFlashcardDTO)
    return response.data
  }

  const deleteFlashcard = async (deckId: number, flashcardId: number): Promise<void> => {
    const response: AxiosResponse<void> = await axios.delete(`${apiUrl}/decks/${deckId}/flashcards/${flashcardId}`)
    return response.data
  }

  return (
    <DeckRepositoryContext.Provider value={{
      getPrivateDecks: getPrivateDecks,
      getOnlineDecks: getOnlineDecks,
      getDeck: getDeck,
      addDeck: addDeck,
      editDeck: editDeck,
      addFlashcard: addFlashcard,
      deleteFlashcard: deleteFlashcard
    }}>
      {children}
    </DeckRepositoryContext.Provider>
  )
}