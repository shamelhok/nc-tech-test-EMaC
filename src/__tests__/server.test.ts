import * as request from "supertest";
import { app } from "../server";
import * as fsP from 'fs/promises'

const resetData=async()=>{
  await fsP.copyFile(__dirname+'/../data/backup/cards.json',__dirname+'/../data/cards.json')
  await fsP.copyFile(__dirname+'/../data/backup/sizes.json',__dirname+'/../data/sizes.json')
  await fsP.copyFile(__dirname+'/../data/backup/templates.json',__dirname+'/../data/templates.json')
}

describe("get /cards", () => {
  test("returns array", async () => {
    const response = await request(app).get("/cards");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array) );
  });
  test("returns  correct array", async () => {
    const response = await request(app).get("/cards");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3)
    expect(response.body[0]).toEqual(
      {
        "title": "card 1 title",
        "imageUrl": "/front-cover-portrait-1.jpg",
        "card_id": "card001"
      });
  });

});

describe("get /cards/:cardId", () => {
test("returns matching card title", async () => {
  const response = await request(app).get("/cards/card001");

  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.objectContaining({
      title: "card 1 title",
    })
  );
});
})
