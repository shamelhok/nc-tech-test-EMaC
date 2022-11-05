import * as express from "express";
import { getCards } from "./models";


export const app = express()

app.set('json spaces', 2);

app.get('/cards', async (req,res) => {
  // respond with a list of cards
  const cards = await getCards()
  res.status(200).send(cards)
})

app.get('/cards/:cardId/:sizeId?', (req,res) => {
  // respond with card by id
  res.status(200).send('')
})
