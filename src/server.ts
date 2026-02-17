import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { errorHandler } from './middleware/errorHandler.js'
import { env } from './config/env.js'
import { swaggerSpec } from './config/swagger.js'
import questionRoutes from '@/routes/questionRoutes.js'
import answerRoutes from '@/routes/answerRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Q&A Management API Docs',
  })
)

app.use('/api/questions', questionRoutes)
app.use('/api/answers', answerRoutes)

app.use(errorHandler)

const PORT = process.env.PORT ? parseInt(process.env.PORT) : parseInt(env.PORT) || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port:${PORT}`)
  console.log(`📊 Environment: ${env.NODE_ENV}`)
})

export default app
