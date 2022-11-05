import { getCards, getTemplates } from "./models";

async function getCardInfo(req,res) {
    // respond with a list of cards
    const cards = await getCards()
    const templates = await getTemplates()
    const result= cards.map(({title,id,pages}) => {
      let imageUrl=''
      if(pages[0]){
        let {templateId}= pages[0]
        let correctTemplate= templates.filter((temp)=>{
          return temp.id===templateId
        })[0]
        imageUrl=correctTemplate.imageUrl
      }
      return {title, card_id:id, imageUrl}
    });
    res.status(200).send(result)
  }

export {getCardInfo}