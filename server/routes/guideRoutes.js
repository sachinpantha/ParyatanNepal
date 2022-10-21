import express from 'express'
import { getGuides, getGuideByID } from '../controllers/guideController.js'
const router = express.Router()
router.route('/').get(getGuides)
router.route('/:id').get(getGuideByID)
export default router