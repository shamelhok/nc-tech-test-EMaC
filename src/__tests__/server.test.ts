import * as request from "supertest";
import { app } from "../server";
import * as fsP from "fs/promises"

// beforeEach(async () => {
//   await fsP.copyFile(
//     __dirname + "/backup/cards.json",
//     __dirname + "/cards.json"
//   );
//   await fsP.copyFile(
//     __dirname + "/backup/sizes.json",
//     __dirname + "/sizes.json"
//   );
//   await fsP.copyFile(
//     __dirname + "/backup/templates.json",
//     __dirname + "/templates.json"
//   );
// })

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

// describe("post /cards",()=>{
//   test('should add ', async() => {
//     const response = await request(app).post("/cards").send(
//       {
//         "title": "example title",
//         "sizes": [
//           "sm",
//           "md",
//           "gt"
//         ],
//         "basePrice": 200,
//         "pages": [
//           {
//             "title": "Front Cover",
//             "templateId": "template001"
//           },
//           {
//             "title": "Inside Left",
//             "templateId": "template002"
//           },
//           {
//             "title": "Inside Right",
//             "templateId": "template003"
//           },
//           {
//             "title": "Back Cover",
//             "templateId": "template004"
//           }
//         ]
//       }
//     ).expect(201);
//     expect(response.status).toBe(201)
//   });
// })



// describe("delete /card/:cardId",()=>{
//   test('should delete card', async() => {
//     const response = await request(app).get("/cards");
//     await request(app).delete("/cards/card001")
//     const afterDelete = await request(app).get("/cards");
//     expect(response.body.length).toBe(afterDelete.body.length)
//   });
// })