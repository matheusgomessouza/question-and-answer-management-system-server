import swaggerJsdoc from 'swagger-jsdoc'
import { env } from './env.js'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Q&A Management API',
      version: '1.0.0',
      description: 'REST API for managing questions and answers',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Development server',
      },
      {
        url: process.env.RAILWAY_PUBLIC_DOMAIN
          ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
          : 'https://api.example.com',
        description: 'Production server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
}

export const swaggerSpec = swaggerJsdoc(options)
