import * as request from "supertest";
import { app } from "../server";

describe("get /cards", () => {
  test("returns matching card title", async () => {
    const response = await request(app).get("/cards");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array) );
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
