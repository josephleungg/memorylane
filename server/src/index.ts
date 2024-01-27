import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { fetchTopBillboard } from "./helpers/fetchTopBillboard"


dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.get("/", (req: Request, res: Response) => {
  res.send("Express is running!")
})

app.get(
  "/billboard/:year",
  async (req: Request, res: Response): Promise<void> => {
    const year: number = parseInt(req.params.year)

    if (isNaN(year)) {
      res.status(400).json({ error: "Invalid year" })
      return
    }

    fetchTopBillboard(year)
      .then((data) => {
        res.json(data)
      })
      .catch((error) => {
        res.status(500).json({ error: error.name })
      })
  }
)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
