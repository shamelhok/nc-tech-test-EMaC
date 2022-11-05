import * as fsP from 'fs/promises';
// import * as fs from 'fs';

async function getCards(){
   const prom= await fsP.readFile(__dirname+'/data/cards.json','utf-8')
   const cards= JSON.parse(prom)
   return cards
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

export {getCards,getSizes,getTemplates}