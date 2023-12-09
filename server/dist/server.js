import express from "express";
import cors from "cors";
import { FlashcardAnswer, FlashcardTrueFalse } from "./types.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.post("/users", (req, res) => {
    const userData = req.body;
    res.send(users.find((user) => user.login == userData.login && user.password == userData.password));
});
app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    res.send(users.find((user) => user.id === userId));
});
app.get("/decks/:id", (req, res) => {
    const deckId = parseInt(req.params.id);
    res.send(decks.find((deck) => deck.id === deckId));
});
app.get("/decks/online", (req, res) => {
    res.send(decks.filter((deck) => deck.isPublic === true));
});
app.get("/decks/private/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    //console.log(userId)
    //console.log(decks.filter((deck: Deck) => deck.author.id === userId))
    res.status(200).send(decks.filter((deck) => deck.author.id === userId));
});
app.post("/decks", (req, res) => {
    const deck = req.body;
    deck.id = decks[decks.length - 1].id + 1;
    decks.push(deck);
    res.status(204).send();
});
app.put("/decks/:id", (req, res) => {
    const deckId = parseInt(req.params.id);
    const editDeckDTO = req.body;
    const indexToUpdate = decks.findIndex((deck) => deck.id === deckId);
    decks[indexToUpdate].name = editDeckDTO.name;
    res.status(204).send();
});
app.delete("/decks/:id", (req, res) => {
    const deckId = parseInt(req.params.id);
    // do zrobienia
});
app.post("/decks/:deckId/flashcards", (req, res) => {
    const deckId = parseInt(req.params.deckId);
    const deckIndex = decks.findIndex((deck) => deck.id === deckId);
    const addFlashcardDTO = req.body;
    let flashcard;
    const flashcardId = decks[deckIndex].flashcards[decks[deckIndex].flashcards.length - 1].id + 1;
    if (addFlashcardDTO.type === "answer")
        flashcard = new FlashcardAnswer(flashcardId, addFlashcardDTO.question, addFlashcardDTO.answer);
    else if (addFlashcardDTO.type === "trueFalse")
        flashcard = new FlashcardTrueFalse(flashcardId, addFlashcardDTO.question, addFlashcardDTO.trueFalseAnswer);
    decks[deckIndex].flashcards.push(flashcard);
    res.status(204).send();
});
app.put("/decks/:deckId/flashcards/:flashcardId", (req, res) => {
    //do zrobienia
});
app.delete("/decks/:deckId/flashcards/:flashcardId", (req, res) => {
    const deckId = parseInt(req.params.deckId);
    const deckIndex = decks.findIndex((deck) => deck.id === deckId);
    const flashcardId = parseInt(req.params.flashcardId);
    const indexToDelete = decks[deckIndex].flashcards.findIndex((flashcard) => flashcard.id === flashcardId);
    decks[deckIndex].flashcards.splice(indexToDelete, 1);
    res.status(204).send();
});
const users = [
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
];
const decks = [
    {
        id: 1,
        name: "Angielski",
        flashcards: [
            new FlashcardAnswer(1, 'classroom', 'klasa'),
            new FlashcardTrueFalse(2, 'Is the sky blue?', true),
            new FlashcardAnswer(3, 'weather', 'pogoda'),
            new FlashcardTrueFalse(4, 'Are elephants able to fly?', false),
            new FlashcardAnswer(5, 'delicious', 'pyszny'),
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
];
app.listen(port, () => console.log(`Server is listening on port ${port}`));
//# sourceMappingURL=server.js.map