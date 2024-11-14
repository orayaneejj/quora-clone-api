import express from "express";
import cors from "cors";
import questionRouter from "./routes/questions.mjs";
import answersRouter from "./routes/answers.mjs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/questions", questionRouter);
app.use("/answers", answersRouter);
app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quora Clone API",
      version: "1.0.0",
      description: "API documentation for the Questions service",
      contact: {
        name: "Orayanee",
      },
    },
    servers: [
      {
        url: "http://localhost:4000/",
      },
    ],
    tags: [
      {
        name: "Questions", // Tag สำหรับ questions
        description: "Operations related to questions",
      },
      {
        name: "Answers", // Tag สำหรับ answers
        description: "Operations related to answers",
      },
    ],
  },
  apis: [
    "app.mjs",
    "./routes/questions.mjs",
    "./routes/answers.mjs",
    "./swagger/questionsSwagger.mjs",
    "./swagger/answersSwagger.mjs",
  ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
