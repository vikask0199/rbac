import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes";

const app: Express = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.29.74:5173",
      "*"
    ],
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req: Request, res: Response) => {
  res.send("hello working");
})


app.use("/spade",router);



export default app;