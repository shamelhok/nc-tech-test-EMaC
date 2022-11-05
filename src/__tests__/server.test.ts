import * as request from "supertest";
import { app } from "../server";
import * as fsP from "fs/promises";

const resetData = async () => {
  await fsP.copyFile(
    __dirname + "/../data/backup/cards.json",
    __dirname + "/../data/cards.json"
  );
  await fsP.copyFile(
    __dirname + "/../data/backup/sizes.json",
    __dirname + "/../data/sizes.json"
  );
  await fsP.copyFile(
    __dirname + "/../data/backup/templates.json",
    __dirname + "/../data/templates.json"
  );
};
// resetData()

describe("get /cards", () => {
  test("returns array", async () => {
    const response = await request(app).get("/cards");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
  test("returns  correct array", async () => {
    const response = await request(app).get("/cards");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0]).toEqual({
      title: "card 1 title",
      imageUrl: "/front-cover-portrait-1.jpg",
      card_id: "card001",
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
  test("returns all properties", async () => {
    const response = await request(app).get("/cards/card001");
    expect(response.body).toHaveProperty('imageUrl')
    expect(response.body).toHaveProperty('card_id')
    expect(response.body).toHaveProperty('base_price')
    expect(response.body).toHaveProperty('availableSizes')
    expect(response.body).toHaveProperty('pages')
  });
  test("returns correct values", async () => {
    const response = await request(app).get("/cards/card003");
    expect(response.body).toMatchObject({
      title: 'card 3 title',
      base_price: 200,
      pages: [
        {
          "title": "Front Cover",
          "templateId": "template006"
        },
        {
          "title": "Inside Top",
          "templateId": "template007"
        },
        {
          "title": "Inside Bottom",
          "templateId": "template007"
        },
        {
          "title": "Back Cover",
          "templateId": "template008"
        }
      ]
    })
  });
  test("returns 404 for non found id", async () => {
    const response = await request(app).get("/cards/card673");
    expect(response.status).toBe(404)
  });
  test("returns 400 for invalid id", async () => {
    const response = await request(app).get("/cards/cfghfghrd673");
    expect(response.status).toBe(400)
  });
});

describe("post /cards",()=>{
  test('should ', () => {
    
  });
})