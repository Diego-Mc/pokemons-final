import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import pokemonRoute from './api/pokemon/pokemon.routes.js'
import next from 'next'

/* CONFIG */
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
