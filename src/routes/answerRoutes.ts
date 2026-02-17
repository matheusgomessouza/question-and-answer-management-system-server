import { Router } from 'express'
import { AnswerController } from '../controllers/answerController.js'

const router = Router()
const answerController = new AnswerController()
/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier
 *         description:
 *           type: string
 *           description: Answer text content
 *         active:
 *           type: boolean
 *           description: Whether the answer is active
 *           default: true
 *         order:
 *           type: number
 *           description: Display order
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         description: "Yes"
 *         active: true
 *         order: 1
 *     AnswerInput:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         description:
 *           type: string
 *           minLength: 1
 *         active:
 *           type: boolean
 *           default: true
 *         order:
 *           type: number
 *           default: 0
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *         details:
 *           type: array
 *           items:
 *             type: object
 */

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: Answer management endpoints
 */

/**
 * @swagger
 * /api/answers:
 *   get:
 *     summary: Get all answers
 *     tags: [Answers]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List of answers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 */
router.get('/', answerController.getAll)

/**
 * @swagger
 * /api/answers/{id}:
 *   get:
 *     summary: Get answer by ID
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Answer ID
 *     responses:
 *       200:
 *         description: Answer found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       404:
 *         description: Answer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', answerController.getById)

/**
 * @swagger
 * /api/answers:
 *   post:
 *     summary: Create a new answer
 *     tags: [Answers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerInput'
 *     responses:
 *       201:
 *         description: Answer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', answerController.create)

/**
 * @swagger
 * /api/answers/{id}:
 *   put:
 *     summary: Update an answer
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Answer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerInput'
 *     responses:
 *       200:
 *         description: Answer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       404:
 *         description: Answer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', answerController.update)

/**
 * @swagger
 * /api/answers/{id}:
 *   delete:
 *     summary: Delete an answer
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Answer ID
 *     responses:
 *       204:
 *         description: Answer deleted successfully
 *       404:
 *         description: Answer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', answerController.delete)

export default router
