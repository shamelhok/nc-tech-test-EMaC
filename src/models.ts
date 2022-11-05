import * as fsP from 'fs/promises';
// import * as fs from 'fs';

async function getCards(){
   const prom= await fsP.readFile(__dirname+'/data/cards.json','utf-8')
   try{const cards= JSON.parse(prom)
   return cards
   } catch {return prom}
}
async function getSizes(){
   const prom= await fsP.readFile(__dirname+'/data/sizes.json','utf-8')
   const sizes= JSON.parse(prom)
   return sizes
}
async function getTemplates(){
   const prom= await fsP.readFile(__dirname+'/data/templates.json','utf-8')
   const templates= JSON.parse(prom)
   return templates
}
async function writeToCards(content) {
    const data =await fsP.writeFile(__dirname+'/data/cards.json',content,'utf-8')
    return data
}
async function addCard({title,basePrice,pages,sizes}) {
    if(title&&basePrice!==undefined&&pages&&sizes){
        let cards =await  getCards()
        let cardIds= cards.map(x=>{
            return parseInt(x.id.slice(4))
        })
        let newId=Math.max(...cardIds)+1
        let id = "card"+((1000+newId).toString()).slice(1)
        cards.push({
            id,title,sizes,basePrice,pages
        })
        await writeToCards(JSON.stringify(cards))
        return {
            id,title,sizes,basePrice,pages
        }
    }else {
        console.log("INVALID CARD");
        return new Error("invalid card")}
}

export {getCards,getSizes,getTemplates,writeToCards,addCard}