import express from 'express'
import cors from 'cors'
import { database } from './storage/database.js'
import { errorHandler } from './middleware/errorHandler.js'
import { env } from './config/env.js'
import questionRoutes from '@/routes/questionRoutes.js'
import answerRoutes from '@/routes/answerRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/questions', questionRoutes)
app.use('/api/answers', answerRoutes)

app.use(errorHandler)

const PORT = parseInt(env.PORT)

database
  .init()
  .then(() => {
    console.log('✅ Database initialized')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port:${PORT}`)
      console.log(`📊 Environment: ${env.NODE_ENV}`)
    })
  })
  .catch(error => {
    console.error('❌ Failed to initialize database:', error)
    process.exit(1)
  })

export default app
