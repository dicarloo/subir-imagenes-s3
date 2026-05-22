require('dotenv').config()
const express = require('express')
const rutaImagenes = require('./rutas/imagenes')
const rutaHealth = require('./rutas/health')
const { logger } = require('./middlewares/logger')

// const multer = require('multer')
// const { v4: uuidv4 } = require('uuid')
// const { subirImagen } = require('./s3')
// const { limpiarNombre } = require('./validaciones')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(logger)

app.use('/', rutaHealth)
app.use('/imagenes', rutaImagenes)

// app.post('/subir', upload.single('imagen'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'no se recibio ninguna imagen' })
//   }
//   const url = await subirImagen({ ... })
//   res.json({ url })
// })

app.use((err, req, res, next) => {
  if (err.message === 'formato no permitido') {
    return res.status(400).json({ error: err.message })
  }
  console.error(err)
  res.status(500).json({ error: 'error interno' })
})

app.listen(PORT, () => {
  console.log(`servidor en http://localhost:${PORT}`)
})
