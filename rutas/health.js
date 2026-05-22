const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // console.log('health check')
  res.json({
    status: 'ok',
    fecha: new Date().toISOString()
  })
})

module.exports = router
