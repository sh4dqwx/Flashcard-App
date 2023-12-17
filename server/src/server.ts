import express, { Express, Request, Response } from "express"
import cors from "cors"
import { User, Deck, FlashcardAnswer, FlashcardTrueFalse, EditDeckDTO, AddFlashcardDTO, Flashcard } from "./types.js"
import dotenv from "dotenv"

dotenv.config()
const app: Express = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.post("/users", (req: Request, res: Response) => {
  const userData: { login: string, password: string} = req.body
  res.send(users.find((user: User) => user.login == userData.login && user.password == userData.password))
})

app.get("/users/:id", (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id)
  res.send(users.find((user: User) => user.id === userId))
})

app.get("/decks/:id", (req: Request, res: Response) => {
  const deckId: number = parseInt(req.params.id)
  res.send(decks.find((deck: Deck) => deck.id === deckId))
})

app.get("/decks/online", (req: Request, res: Response) => {
  res.send(decks.filter((deck: Deck) => deck.isPublic === true))
})

app.get("/decks/private/:userId", (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId)
  res.status(200).send(decks.filter((deck: Deck) => deck.author.id === userId))
})

app.post("/decks", (req: Request, res: Response) => {
  const deck: Deck = req.body
  deck.id = decks[decks.length - 1].id + 1
  decks.push(deck)
  res.status(204).send()
})

app.put("/decks/:id", (req: Request, res: Response) => {
  const deckId: number = parseInt(req.params.id)
  const editDeckDTO: EditDeckDTO = req.body
  const indexToUpdate: number = decks.findIndex((deck: Deck) => deck.id === deckId)
  decks[indexToUpdate].name = editDeckDTO.name
  res.status(204).send()
})

app.delete("/decks/:id", (req: Request, res: Response) => {
  const deckId: number = parseInt(req.params.id)
  // do zrobienia
})

app.post("/decks/:deckId/flashcards", (req: Request, res: Response) => {
  const deckId: number = parseInt(req.params.deckId)
  const deckIndex: number = decks.findIndex((deck: Deck) => deck.id === deckId)
  const addFlashcardDTO: AddFlashcardDTO = req.body

  let flashcard: Flashcard
  const flashcardId = decks[deckIndex].flashcards[decks[deckIndex].flashcards.length - 1].id + 1
  if(addFlashcardDTO.type === "answer")
    flashcard = new FlashcardAnswer(flashcardId, addFlashcardDTO.question, addFlashcardDTO.answer)
  else if(addFlashcardDTO.type === "trueFalse")
    flashcard = new FlashcardTrueFalse(flashcardId, addFlashcardDTO.question, addFlashcardDTO.trueFalseAnswer)

  decks[deckIndex].flashcards.push(flashcard)
  res.status(204).send()
})

app.put("/decks/:deckId/flashcards/:flashcardId", (req: Request, res: Response) => {
  //do zrobienia
})

app.delete("/decks/:deckId/flashcards/:flashcardId", (req: Request, res: Response) => {
  const deckId: number = parseInt(req.params.deckId)
  const deckIndex: number = decks.findIndex((deck: Deck) => deck.id === deckId)
  const flashcardId: number = parseInt(req.params.flashcardId)

  const indexToDelete: number = decks[deckIndex].flashcards.findIndex((flashcard: Flashcard) => flashcard.id === flashcardId)
  decks[deckIndex].flashcards.splice(indexToDelete, 1)
  res.status(204).send()
})

const users: User[] = [
  {
    id: 1,
    login: "admin",
    password: "admin"
  },
  {
    id: 2,
    login: "user",
    password: "user"
  }
]
const decks: Deck[] = [
  {
    id: 1,
    name: "Angielski",
    flashcards: [
      new FlashcardAnswer(1, 'classroom', 'klasa'),
      new FlashcardTrueFalse(2, 'Is the sky blue?', true),
      new FlashcardAnswer(3, 'weather', 'pogoda'),
      new FlashcardTrueFalse(4, 'Are elephants able to fly?', false),
      new FlashcardAnswer(5, 'delicious', 'pyszny'),
      new FlashcardAnswer(6, 'book', 'książka'),
      new FlashcardAnswer(7, 'garden', 'ogród'),
      new FlashcardAnswer(8, 'telephone', 'telefon'),
      new FlashcardAnswer(9, 'mountain', 'góra'),
      new FlashcardAnswer(10, 'happiness', 'szczęście'),
      new FlashcardAnswer(11, 'ocean', 'ocean'),
      new FlashcardAnswer(12, 'camera', 'aparat fotograficzny'),
      new FlashcardAnswer(13, 'friendship', 'przyjaźń'),
      new FlashcardTrueFalse(14, 'Is the sun a planet?', false),
      new FlashcardTrueFalse(15, 'Are birds mammals?', false)
    ],
    author: {
      id: 1,
      login: "admin",
      password: "admin"
    },
    isPublic: true
  },
  {
    id: 2,
    name: "Niemiecki",
    flashcards: [
      new FlashcardAnswer(1, 'Haus', 'Dom'),
      new FlashcardAnswer(2, 'Apfel', 'Jabłko'),
      new FlashcardAnswer(3, 'Auto', 'Samochód'),
      new FlashcardTrueFalse(4, 'Ist Berlin die Hauptstadt von Deutschland?', true),
      new FlashcardTrueFalse(5, 'Ist Wasser eine feste Substanz?', false)
    ],
    author: {
      id: 1,
      login: "admin",
      password: "admin"
    },
    isPublic: false
  },
  {
    id: 3,
    name: "Hiszpański",
    flashcards: [
      new FlashcardAnswer(1, 'Casa', 'Dom'),
      new FlashcardAnswer(2, 'Manzana', 'Jabłko'),
      new FlashcardAnswer(3, 'Coche', 'Samochód'),
      new FlashcardTrueFalse(1, 'Es Madrid la capital de España?', true),
      new FlashcardTrueFalse(2, 'El agua es una sustancia sólida?', false)
    ],
    author: {
      id: 2,
      login: "user",
      password: "user"
    },
    isPublic: false
  },
]

app.listen(port, () => console.log(`Server is listening on port ${port}`))