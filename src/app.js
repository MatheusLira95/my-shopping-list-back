import express from "express";
import cors from "cors";
import joi from "joi";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/list", async (req, res) => {
  try {
    const validationSchema = joi.object({
      text: joi.string().required().min(2),
    });

    const validation = validationSchema.validate(req.body);

    if (validation.error) {
      console.log(validation.error);
      return res.sendStatus(400);
    }
    const { text } = req.body;
    await connection.query(
      `
      INSERT INTO list
      (item)
      VALUES ($1)
      `,
      [text]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default app;
