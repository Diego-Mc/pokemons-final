import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import pokemonRoute from './api/pokemon/pokemon.routes.js'
import next from 'next'

/* CONFIG */
// const __filepath = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filepath)
dotenv.config()
const isDev = process.env.NODE_ENV !== 'production'

const nextApp = next({ dev: isDev })
const handle = nextApp.getRequestHandler()

nextApp
  .prepare()
  .then(() => {
    const app = express()

    app.use(express.json())
    app.use(morgan('common'))
    app.use('/api/pokemon', pokemonRoute)
    app.get('*', (req, res) => handle(req, res))
    const PORT = process.env.PORT || 6001
    app.listen(PORT, () => console.log('Server is live at ' + PORT))
  })
  .catch((e) => console.error(e))

// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// app.use(cookieParser())
//TODO: setup cors for dist

// if (isDev) {
//   app.use(cors({ credentials: true, origin: true }))
// } else {
//   app.use(express.static(path.join(__dirname, 'server/public')))
// }

/* ROUTES */

// app.get('/**', (req, res) => {
//   res.sendFile(path.join(__dirname, 'server/public', 'index.html'))
// })

/* MONGOOSE SETUP */
