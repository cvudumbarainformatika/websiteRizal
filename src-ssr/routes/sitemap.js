// routes/sitemap.js
import express from 'express'
import sitemap from '../sitemap.js'

const router = express.Router()

router.get('/sitemap.xml', sitemap)

export default router
