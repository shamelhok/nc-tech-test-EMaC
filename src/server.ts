import * as express from "express";
import { deleteCard, getCardInfo, getCardInfoById, postCard } from "./controllers";
import { getCards, getSizes, getTemplates } from "./models";


export const app = express()

app.use(express.json())
app.set('json spaces', 2);

app.get('/cards', getCardInfo)

app.get('/cards/:cardId',getCardInfoById)

app.post('/cards',postCard)

app.delete('/cards/:cardId',deleteCard)