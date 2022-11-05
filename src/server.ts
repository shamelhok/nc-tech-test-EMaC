import * as express from "express";
import { getCardInfo } from "./controllers";
import { getCards, getSizes, getTemplates } from "./models";


export const app = express()

app.set('json spaces', 2);

app.get('/cards', getCardInfo)

app.get('/cards/:cardId/:sizeId?', (req,res) => {
  // respond with card by id
  res.status(200).send('')
})
