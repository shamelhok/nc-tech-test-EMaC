import { getCards, getTemplates } from "./models";

async function getCardInfo(req, res) {
  // respond with a list of cards
  const cards = await getCards();
  const templates = await getTemplates();
  const result = cards.map(({ title, id, pages }) => {
    let imageUrl = "";
    if (pages[0]) {
      let { templateId } = pages[0];
      let correctTemplate = templates.filter((temp) => {
        return temp.id === templateId;
      })[0];
      imageUrl = correctTemplate.imageUrl;
    }
    return { title, card_id: id, imageUrl };
  });
  res.status(200).send(result);
}

async function getCardInfoById(req, res) {
  // respond with card by id
  let { cardId } = req.params;
  let cards = await getCards();
  let templates = await getTemplates();
  let correctCard: { [k: string]: any } = {};
  for (let card of cards) {
    if (card.id === cardId) {
      correctCard = card;
      break;
    }
  }
  correctCard.card_id = correctCard.id;
  delete correctCard.id;
  correctCard.base_price = correctCard.basePrice;
  delete correctCard.basePrice;
  let { templateId } = correctCard.pages[0];
  let correctTemplate = templates.filter((temp) => {
    return temp.id === templateId;
  })[0];
  correctCard.imageUrl = correctTemplate.imageUrl;
  const sizeKey={sm:"Small", md:"Medium",gt:"Giant"}
  correctCard.availableSizes= correctCard.sizes.map((size=>{
    return{id:size, title:sizeKey[size]}
  }))
  delete correctCard.sizes
  res.status(200).send(correctCard);
}

export { getCardInfo, getCardInfoById };
