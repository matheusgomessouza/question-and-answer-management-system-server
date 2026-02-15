import { Router } from 'express'
import { answerController } from '../controllers/answerController.js'

const router = Router()

router.get('/', answerController.getAll)
router.get('/:id', answerController.getById)
router.post('/', answerController.create)
router.put('/:id', answerController.update)
router.delete('/:id', answerController.delete)

export default router
