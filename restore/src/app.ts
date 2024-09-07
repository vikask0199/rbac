import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import urls from "./config/urlConfig";
import router from "./routes/routes";



const app: Express = express();

app.use(
  cors({
    origin: [
      /http(s)?:\/\/localhost(:[0-9]+)?(\/)?$/,
      /^http(s)?:\/\/13\.233\.145\.192(:[0-9]+)?(\/)?$/,
      /\**/
      
    ],
    optionsSuccessStatus:200,
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

app.use(urls.apiBaseUrl, router);

export default app;