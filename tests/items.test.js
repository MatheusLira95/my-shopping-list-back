import supertest from "supertest";
import app from "../src/app.js";
import connection from "../src/database";

beforeEach(async () => {
  await connection.query(`DELETE FROM list`);
});

afterAll(async () => {
  await connection.query(`DELETE FROM list`);
  connection.end();
});

describe("POST /list", () => {
  it("returns 400 for a empty text ", async () => {
    const body = {
      text: "",
    };
    const result = await supertest(app).post("/list").send(body);
    expect(result.status).toEqual(400);
  });

  it("returns 201 for a valid text ", async () => {
    const body = {
      text: "Sabão",
    };
    const result = await supertest(app).post("/list").send(body);
    expect(result.status).toEqual(201);
  });
});
